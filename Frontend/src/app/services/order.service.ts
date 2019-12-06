import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paginator } from '../util/paginator';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public constructor(
        private http: HttpClient
    ) {

    }

    public paginator(): Paginator<Order> {
        return new Paginator(this.http, `${environment.host}/orders/page`);
    }

    public save(order: Order): Observable<any> {
        return this.http.post(`${environment.host}/orders`, order);
    }

    public findById(id: number): Observable<Order> {
        return this.http.get<Order>(`${environment.host}/orders/${id}`);
    }

    public update(order: Order): Observable<any> {
        return this.http.patch(`${environment.host}/orders/${order.id}`, order);
    }

}
