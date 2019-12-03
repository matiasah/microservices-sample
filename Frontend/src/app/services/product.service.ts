import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paginator } from '../util/paginator';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public constructor(
        private http: HttpClient
    ) {

    }

    public paginator(): Paginator<Product> {
        return new Paginator(this.http, `${environment.host}/products/page`);
    }

    public save(product: Product): Observable<any> {
        return this.http.post(`${environment.host}/products`, product);
    }

    public findById(id: number): Observable<Product> {
        return this.http.get<Product>(`${environment.host}/products/${id}`);
    }

    public update(product: Product): Observable<any> {
        return this.http.patch(`${environment.host}/products/${product.id}`, product);
    }

}
