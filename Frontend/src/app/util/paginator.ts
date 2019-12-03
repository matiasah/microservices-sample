import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, skip } from 'rxjs/operators';

export interface SpringPage<T> {
    content: T[];
    pageable: {
        sort: {
            unsorted: boolean;
            sorted: boolean;
            empty: boolean;
        },
        pageSize: number;
        pageNumber: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    sort: {
        unsorted: boolean;
        sorted: boolean;
        empty: boolean;
    };
    number: number;
    numberOfElements: number;
    size: number;
    empty: boolean;
}

export class Paginator<T> {

    public constructor(
        private http: HttpClient,
        private path: string
    ) {

    }

    // Datos
    private dataSource: MatTableDataSource<T>;

    // Ordenamiento
    private sort: { [key: string]: string } = {};

    // Columnas adicionales a ordenar
    private sortWith: { [key: string]: string } = {};

    // Página actual
    private page: PageEvent = {
        pageIndex: 0,
        pageSize: 5,
        length: 0
    };

    // Parámetros adicionales
    private params: { [key: string]: string } = {};

    public pageSubject: BehaviorSubject<PageEvent> = new BehaviorSubject(this.page);
    public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public init(dataSource: MatTableDataSource<T>, paginator: MatPaginator, sort: MatSort, form?: NgForm): void {
        this.dataSource = dataSource;
        this.dataSource.paginator = paginator;
        this.dataSource.sort = sort;

        // Al cambiar la pagina actual
        paginator.page.subscribe((pageEvent: PageEvent) => {
            this.page = pageEvent;
            this.update();
        });

        // Al cambiar el orden de alguna columna
        sort.sortChange.subscribe((event: Sort) => {
            if (event.direction === '') {
                this.sort = {};
            } else {
                this.sort = { [event.active]: event.direction };
            }
            this.update();
        });

        // Si hay formulario
        if (form && form.valueChanges) {
            // Al modificar el contenido del formulario
            form.valueChanges
                // Despues de 500ms de la última modificación
                .pipe(debounceTime(500))
                // Saltar primer valor
                .pipe(skip(1))
                // Suscribirse
                .subscribe(
                    params => {
                        // Actualizar respuesta
                        Object.assign(this.params, params);

                        // Actualizar datos del formulario
                        this.update();
                    }
                );
        }

        this.update();
    }

    public getSortWith(): { [key: string]: string } {
        return this.sortWith;
    }

    public getParams(): { [key: string]: string } {
        return this.params;
    }

    public update(): void {
        // Establecer parámetros
        let params: HttpParams = new HttpParams();

        // Establecer página
        params = params.append('page', this.page.pageIndex.toString());

        // Establecer tamaño
        params = params.append('size', this.page.pageSize.toString());

        // Ordenamiento
        for (const [column, direction] of Object.entries(this.sort)) {
            params = params.append('sort', column + ',' + direction);

            // Ordenamiento de columnas adicionales
            if (this.sortWith[column]) {
                params = params.append('sort', this.sortWith[column] + ',' + direction);
            }
        }

        // Parámetros adicionales
        for (const [key, value] of Object.entries(this.params)) {
            // Si el valor no es nulo o indefinido
            if (value) {
                params = params.append(key, value);
            }
        }

        // Indicar que se encuentra cargando resultados
        this.isLoadingSubject.next(true);

        this.http.get<SpringPage<T>>(this.path, { params }).subscribe(
            page => {
                // Obtener datos
                this.dataSource.data = page.content;

                // Indicar la pagina actual
                this.pageSubject.next({
                    pageIndex: page.number,
                    pageSize: page.size,
                    length: page.totalElements,
                });

                // Indicar que no se encuentra cargando resultados
                this.isLoadingSubject.next(false);
            }
        );
    }

}
