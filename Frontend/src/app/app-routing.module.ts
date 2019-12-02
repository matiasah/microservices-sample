import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemGuard } from './guards/system.guard';

const routes: Routes = [
    {
        path: 'system',
        loadChildren: () => import('./modules/system/system.module').then(m => m.SystemModule),
        canActivate: [SystemGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
