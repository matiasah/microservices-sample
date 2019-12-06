import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Paginator } from 'src/app/util/paginator';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';
import { CreateOrderComponent } from '../create-order/create-order.component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    // Datatable columns
    public displayedColumns: string[] = [
        'id',
        'client',
        'options'
    ];

    // Pagination
    public paginator: Paginator<Order>;

    // Data-source
    public dataSource: MatTableDataSource<Order> = new MatTableDataSource();

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
    public clientFilter: string;

    public constructor(
        private orderService: OrderService,
        private dialog: MatDialog
    ) {
        // Create paginator
        this.paginator = this.orderService.paginator();

        // Observables
        this.isLoading = this.paginator.isLoadingSubject;
        this.page = this.paginator.pageSubject;
    }

    public ngOnInit() {
        this.paginator.init(this.dataSource, this.matPaginator, this.matSort, this.form);
    }

    public create() {
        // Open dialog
        const ref: MatDialogRef<CreateOrderComponent> = this.dialog.open(CreateOrderComponent, {
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
