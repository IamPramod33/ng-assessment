import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { PizzaLogisticsService } from 'src/app/core/services/pizza-logistics.service';
import { Order } from 'src/app/shared/models/order.model';
import { PizzaSize } from 'src/app/shared/models/pizza-size.model';
import { Topping } from 'src/app/shared/models/topping.model';
import { DriverState } from '../../shared/enums/driver-state.enum';
import { PizzaState } from '../../shared/enums/pizza-state.enum';


@Component({
  selector: 'app-pizza-logistics',
  templateUrl: './pizza-logistics.component.html',
  styleUrls: ['./pizza-logistics.component.scss']
})

export class PizzaLogisticsComponent implements OnInit {
  newOrderForm: FormGroup;
  toppingList: Topping[] = [];
  selectedToppings: Topping[];
  pizzaSize: PizzaSize[] = [{
    size: 1,
    name: 'Regular'
  }, {
    size: 2,
    name: 'Medium'
  }, {
    size: 3,
    name: 'Large'
  }];
  orders: Order[] = [];
  orderState = {
    0: 'Send To Kitchen',
    1: 'New'
  };
  orderSubmitted = false;

  constructor(private formBuilder: FormBuilder, private pizzaLogisticService: PizzaLogisticsService) { }
  public ngOnInit(): void {
    this.pizzaLogisticService.getToppings().subscribe((data: Topping[]) => {
      // console.log(data);
      this.toppingList = data;
    },
    error => {
      // console.log(error);
    });
    this.pizzaLogisticService.getOrders().subscribe((orderData: Order[]) => {
      // console.log(orderData)
      this.orders = orderData;
    },
    error => {
      // console.log(error);
    });
    this.newOrderForm = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      toppings: ['', Validators.required],
      size: ['', Validators.required]
    });
  }

  // Method to Place Order
  placeOrder() {
    this.orderSubmitted = true;
    if (this.newOrderForm.invalid) {
        return;
    }
    const newOrder: Order = {
      id: this.orders.length + 1,
      customerName: this.newOrderForm.controls['customerName'].value,
      size: this.newOrderForm.controls['size'].value,
      state: 1,
      toppings: this.newOrderForm.controls['toppings'].value
    };
    this.orders.push(newOrder);
  }

}
