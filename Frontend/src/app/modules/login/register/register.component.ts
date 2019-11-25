import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    // User that is going to be registered
    public user: User = {} as User;

    // Form
    @ViewChild('form', { static: true })
    public form: NgForm;

    // Indicate if it's signing up
    public signingUp: boolean;

    // Indicate if there was a error during sign up
    public error: boolean;

    // Indicate if signup was successful
    public successful: boolean;

    public constructor(
        private authService: AuthService
    ) {

    }

    public ngOnInit() {

    }

    public onSubmit() {
        // If the form data is valid
        if (this.form.valid) {
            // Indicate that it's signing up
            this.signingUp = true;

            // Indicate that there isn't a error yet
            this.error = false;

            // Indicate that sign up isn't successful yet
            this.successful = false;

            // Sign up
            this.authService.signUp(this.user).subscribe(
                Response => {
                    // Indicate that it isn't signing up
                    this.signingUp = false;

                    // If the responsive is positive (non-false | non-undefined)
                    if (Response) {
                        // Indicate that sign up was successful
                        this.successful = true;
                    } else {
                        // Indicar that there was a error during sign up
                        this.error = true;
                    }
                },
                Error => {
                    // Indicate that it isn't signing up
                    this.signingUp = false;

                    // Indicate that there was a error during sign up
                    this.error = true;
                }
            );
        }
    }

}
