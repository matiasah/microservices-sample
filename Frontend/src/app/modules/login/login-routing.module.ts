import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { LoginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
