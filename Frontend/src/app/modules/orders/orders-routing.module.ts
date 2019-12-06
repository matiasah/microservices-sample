import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders/orders.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

const routes: Routes = [
    {
        path: '',
        component: OrdersComponent
    },
    {
        path: ':id',
        component: EditOrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }
