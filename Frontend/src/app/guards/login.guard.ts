import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    public constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // If the token is valid
        if (this.authService.isTokenValid()) {
            // Negate access to login component and go to system
            this.router.navigate(['system']);
            return false;
        }

        // Allow access to login component
        return true;
    }

}
