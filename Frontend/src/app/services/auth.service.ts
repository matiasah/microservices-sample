import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserToken } from '../interfaces/user-token';
import { User } from '../interfaces/user';

export interface ResponseToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // Current token
    private token: UserToken | null;

    public constructor(
        private http: HttpClient
    ) {
        // Read data from local storage
        const tokenData: string | null = localStorage.getItem('app_token');

        // If there's data
        if (tokenData != null) {
            // Parse data
            this.token = JSON.parse(tokenData);

            // If the data is valid
            if (this.token != null) {
                // Transform expiration date to Date object
                this.token.expiration = new Date(this.token.expiration);
            }
        }
    }

    /**
     * Attempt to login
     *
     * @param user The user
     */
    public signIn(user: User): Observable<ResponseToken> {
        // Form with the user login credentials
        const form: FormData = new FormData();
        form.set('grant_type', 'password');
        form.set('username', user.username);
        form.set('password', user.password);

        // Send request
        return this.http.post<ResponseToken>(`${environment.host}/auth/oauth/token`, form);
    }

    /**
     * Registers a user
     * 
     * @param user The user
     */
    public signUp(user: User): Observable<boolean> {
        return this.http.post<boolean>(`${environment.host}/users`, user);
    }

    /**
     * Sets the current token
     *
     * @param token The token
     */
    public setToken(token: UserToken): void {
        // Store token in local storage
        localStorage.setItem('app_token', JSON.stringify(token));

        // Store in memory
        this.token = token;
    }

    /**
     * Remove current token
     */
    public removeToken(): void {
        // Remove token from local storage
        localStorage.removeItem('app_token');

        // Remove from memory
        this.token = null;
    }

    /**
     * Get the current token
     */
    public getToken(): UserToken | null {
        // Return token from memory
        return this.token;
    }

    /**
     * Validate token expiration
     */
    public isTokenValid(): boolean {
        // If there's a token with expiration date
        if (this.token != null && this.token.expiration != null) {
            // Verify the token is not expired
            return this.token.expiration.getTime() > Date.now();
        }
        return false;
    }

}
