import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';

@Component({
    selector: 'app-edit-order',
    templateUrl: './edit-order.component.html',
    styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

    // The object to edit
    public order: Order = {} as Order;

    // Indicates if the object is being edited
    public editing = false;

    // Form
    @ViewChild('form', { static: true })
    public form: NgForm;

    public constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private orderService: OrderService
    ) {
        // Subscribe to ID path variable
        this.route.params.subscribe(
            params => {
                // Get the ID
                const id: number = params.id;

                // Find order by id
                this.orderService.findById(id).subscribe(
                    response => {
                        this.order = response;
                    }
                );
            }
        );
    }

    public ngOnInit() {

    }

    public onSubmit() {
        // If the form is valid
        if (this.form.valid) {
            // Indicate that the object is being edited
            this.editing = true;

            // Edit object
            this.orderService.save(this.order).subscribe(
                response => {
                    // Indicate the object is not being edited
                    this.editing = false;

                    // Notify successful edition
                    this.snackBar.open('The order was updated successfully', 'Accept', { duration: 2000 });
                },
                error => {
                    // Indicate the object is not being edited
                    this.editing = false;

                    // Notify failed to edit
                    this.snackBar.open('Failed to update the order', 'Accept', { duration: 2000 });
                }
            );
        }
    }

}
