import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system/system.component';

const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
        children: [
            {
                path: 'orders',
                loadChildren: () => import('../orders/orders.module').then(m => m.OrdersModule)
            },
            {
                path: 'products',
                loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule { }
