import { Topping } from './topping.model';

export class Order {
    id: number;
    customerName: string;
    size: number;
    state: number;
    toppings: Topping[];
}
