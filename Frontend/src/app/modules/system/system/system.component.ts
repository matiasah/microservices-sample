import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

    public constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    public ngOnInit() {

    }

    public onLogout() {
        // Remove token
        this.authService.removeToken();

        // Go to login component
        this.router.navigate(['']);
    }

}
