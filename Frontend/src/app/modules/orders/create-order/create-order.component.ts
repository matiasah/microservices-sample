import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';

@Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

    // The object to create
    public order: Order = {} as Order;

    // Indicates if the object is being created
    public creating = false;

    // Form
    @ViewChild('form', { static: true })
    public form: NgForm;

    public constructor(
        private dialogRef: MatDialogRef<CreateOrderComponent>,
        private snackBar: MatSnackBar,
        private orderService: OrderService
    ) {

    }

    public ngOnInit() {

    }

    public onSubmit() {
        // If the form is valid
        if (this.form.valid) {
            // Indicate that the object is being created
            this.creating = true;

            // Create object
            this.orderService.save(this.order).subscribe(
                response => {
                    // Indicate the object is not being created
                    this.creating = false;

                    // Notify successful creation
                    this.snackBar.open('The order was created successfully', 'Accept', { duration: 2000 });

                    // Close modal
                    this.dialogRef.close();
                },
                error => {
                    // Indicate the object is not being created
                    this.creating = false;

                    // Notify failed to create
                    this.snackBar.open('Failed to create the order', 'Accept', { duration: 2000 });

                    // Close modal
                    this.dialogRef.close();
                }
            );
        }
    }

}
