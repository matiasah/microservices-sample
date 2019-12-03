import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Paginator } from 'src/app/util/paginator';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    // Datatable columns
    public displayedColumns: string[] = [
        'id',
        'name',
        'price',
        'options'
    ];

    // Pagination
    public paginator: Paginator<Product>;

    // Data-source
    public dataSource: MatTableDataSource<Product> = new MatTableDataSource();

    // Indicates if the component is loading results
    public isLoading: Observable<boolean>;

    // Current page
    public page: Observable<PageEvent>;

    // Sort
    @ViewChild(MatSort, { static: true })
    public matSort: MatSort;

    // Pagination
    @ViewChild(MatPaginator, { static: true })
    public matPaginator: MatPaginator;

    // Form
    @ViewChild('form', { static: true })
    public form: NgForm;

    // Search filters
    public idFilter: string;
    public nameFilter: string;
    public priceFilter: string;

    public constructor(
        private productService: ProductService,
        private dialog: MatDialog
    ) {
        // Create paginator
        this.paginator = this.productService.paginator();

        // Observables
        this.isLoading = this.paginator.isLoadingSubject;
        this.page = this.paginator.pageSubject;
    }

    public ngOnInit() {
        this.paginator.init(this.dataSource, this.matPaginator, this.matSort, this.form);
    }

    public create() {
        // Open dialog
        const ref: MatDialogRef<CreateProductComponent> = this.dialog.open(CreateProductComponent, {
            width: '500px'
        });

        // On closing dialog
        ref.afterClosed().subscribe(
            response => {
                // Update paginator
                this.paginator.update();
            }
        );
    }

    /*
    public eliminar(tipoAnalisis: TipoAnalisis) {
        // Crear dialogo
        const ref: MatDialogRef<EliminarTipoAnalisisComponent> = this.dialog.open(EliminarTipoAnalisisComponent, {
            width: '500px',
            data: tipoAnalisis
        });

        // Al cerrar dialogo
        ref.afterClosed().subscribe(
            response => {
                // Actualizar paginador
                this.paginator.update();
            }
        );
    }
    */

}
