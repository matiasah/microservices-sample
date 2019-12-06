import { Product } from './product';

export interface Order {
    id?: string;
    client: string;
    products: Product[];
}
