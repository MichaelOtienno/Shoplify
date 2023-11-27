import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private router:Router) { }

  emptyCart: boolean = true
  paymentOptions: boolean = false
  content: boolean = false
  deletes: boolean = false

  //payment
  payment(){
    this.paymentOptions = true

  }

  //decline payment
  notYet(){
    this.paymentOptions = false
  }

}
