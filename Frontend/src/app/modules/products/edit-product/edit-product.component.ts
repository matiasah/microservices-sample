import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

    // The object to modify
    public product: Product;

    // Indicates if the object is being edited
    public editing = false;

    // Form
    @ViewChild('form', { static: true })
    public form: NgForm;

    public constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private productService: ProductService
    ) {
        // Subscribe to ID path variable
        this.route.params.subscribe(
            params => {
                // Get the ID
                const id: number = params.id;

                // Find product by id
                this.productService.findById(id).subscribe(
                    response => {
                        this.product = response;
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
            this.productService.save(this.product).subscribe(
                response => {
                    // Indicate the object is not being edited
                    this.editing = false;

                    // Notify successful creation
                    this.snackBar.open('The product was updated successfully', 'Accept', { duration: 2000 });
                },
                error => {
                    // Indicate the object is not being edited
                    this.editing = false;

                    // Notify failed to update
                    this.snackBar.open('Failed to update the product', 'Accept', { duration: 2000 });
                }
            );
        }
    }

}
