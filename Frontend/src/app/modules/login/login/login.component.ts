import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { UserToken } from 'src/app/interfaces/user-token';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    // User to login
    public user: User = {} as User;

    // Form
    @ViewChild('form', { static: true })
    public form: NgForm;

    // Indicates if credentials are incorrect
    public incorrect: boolean;

    // Indicates if it's currently signing in
    public signingIn: boolean;

    public constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    public ngOnInit() {

    }

    public onSubmit() {
        // If the form is valid
        if (this.form.valid) {
            // Indicate that it's currently singing in
            this.signingIn = true;

            // Indicate that credentials aren't incorrect
            this.incorrect = false;

            // Attempt sign in
            this.authService.signIn(this.user).subscribe(
                responseToken => {
                    // Create user token instance
                    const userToken: UserToken = {
                        access_token: responseToken.access_token,
                        expiration: new Date(Date.now() + responseToken.expires_in * 1000),
                        token_type: responseToken.token_type,
                    };

                    // Set the current token
                    this.authService.setToken(userToken);

                    // Redirect to the system
                    // this.router.navigate(['ae']);
                },
                error => {
                    // Indicate that it's currently not singing in
                    this.signingIn = false;

                    // Indicate that credentials are incorrect
                    this.incorrect = true;
                }
            );
        }
    }

}
