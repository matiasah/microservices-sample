import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { UserToken } from '../interfaces/user-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private CLIENT_ID = 'android-client';
    private CLIENT_SECRET = 'android-secret';

    public constructor(
        private authService: AuthService
    ) {

    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Is the request headed to the backend?
        if (request.url.startsWith(environment.host)) {
            // Ruta
            const route: string = request.url.substring(environment.host.length);

            // Is it OAuth2 API route?
            if (route.substr(0, 16) === 'auth/oauth/token') {
                // Autorización
                const authorization: string = 'Basic ' + window.btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET);

                // Cabeceras
                const headers: HttpHeaders = request.headers.set('Authorization', authorization);

                // Copiar petición
                const newRequest: HttpRequest<any> = request.clone({
                    headers
                });

                return next.handle(newRequest);
            } else if (this.authService.isTokenValid()) {
                // Obtener token
                const token: UserToken | null = this.authService.getToken();

                // Si hay un token
                if (token != null) {
                    // Cabeceras
                    const headers: HttpHeaders = request.headers.set('Authorization', token.token_type + ' ' + token.access_token);

                    // Copiar petición
                    const newRequest: HttpRequest<any> = request.clone({
                        headers
                    });

                    return next.handle(newRequest);
                }
            }
        }

        return next.handle(request);
    }

}
