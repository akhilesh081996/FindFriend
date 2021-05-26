import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, Events } from '@ionic/angular';
import { AllServicesService } from '../all-services.service';
import { Router } from '@angular/router';

declare global {
  interface Window {
    paypal: any;
  }
}
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.page.html',
  styleUrls: ['./paypal.page.scss'],
})
export class PaypalPage  {

  paymentAmount: string = '3.33';
  currency: string = 'USD';
  currencyIcon: string = '$';
  constructor(
    public NavController:NavController,
    public AllServicesService:AllServicesService,
    public router: Router,

  ) {
    let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      window.paypal.Buttons({
        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.paymentAmount
              }
            }]
          });

        },
        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {
              // Show a success message to the buyer
              _this.router.navigate(['thankyou'], { queryParams: { msg: details, page_title: details } });
              // alert('Transaction completed by ' + details.payer.name.given_name + '!');
            })
            .catch(err => {
            })
        }
      }).render('#paypal-button-container');
    }, 500)
  }
back(){
  this.NavController.back()
}

}
