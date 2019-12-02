import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SystemGuard implements CanActivate {

    public constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // If the token is not valid
        if (!this.authService.isTokenValid()) {
            // Negate access to system module and go to login component
            this.router.navigate(['']);

            return false;
        }

        // Allow access to system module
        return true;
    }

}
