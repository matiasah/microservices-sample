import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

    // The object to create
    public product: Product = {} as Product;

    // Indicates if the object is being created
    public creating = false;

    // Form
    @ViewChild('form', { static: true })
    public form: NgForm;

    public constructor(
        private dialogRef: MatDialogRef<CreateProductComponent>,
        private snackBar: MatSnackBar,
        private productService: ProductService
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
            this.productService.save(this.product).subscribe(
                response => {
                    // Indicate the object is not being created
                    this.creating = false;

                    // Notify successful creation
                    this.snackBar.open('The product was created successfully', 'Accept', { duration: 2000 });

                    // Close modal
                    this.dialogRef.close();
                },
                error => {
                    // Indicate the object is not being created
                    this.creating = false;

                    // Notify failed to create
                    this.snackBar.open('Failed to create the product', 'Accept', { duration: 2000 });

                    // Close modal
                    this.dialogRef.close();
                }
            );
        }
    }

}
