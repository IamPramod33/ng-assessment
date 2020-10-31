import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { Topping } from 'src/app/shared/models/topping.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaLogisticsService {

  constructor(private http: HttpClient) { }

  getToppings() {
    return this.http.get<Topping[]>(`http://localhost:4300/toppings`);
    // return this.http.get<Topping[]>(`/api/login`);
  }
  getOrders() {
    return this.http.get<Order[]>(`http://localhost:4300/orders`);
    // return this.http.get<Topping[]>(`/api/login`);
  }

}
