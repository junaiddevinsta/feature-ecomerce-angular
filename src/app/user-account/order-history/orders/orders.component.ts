import { Component, OnInit } from '@angular/core';
import { checkout, order } from 'src/app/data-type';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  checkoutData: checkout[] | undefined;
  orderData:order[]|undefined;
  singleUserCheckoutData:any;
  // statusButton:order[]|undefined;
  statusButton:any
  // statusChangedButton=false;
  orderStatusMsg: string | undefined;
  constructor(private order:OrderService, private product:ProductService, private alert:AlertService) { }

  ngOnInit(): void {
    this.getOrderList();
    this.loadDetails();

  }
  cancelOrder(orderId:number|undefined){

    orderId && this.order.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        // this.orderStatusMsg = "Cancelled";
        console.log("single cancel order=>",result)
        // this.statusButton=result;
        console.log("statusButton=>",this.statusButton)
  // this.orderStatusMsg = "Cancelled";
        // this.alert.cancelOrder();
        this.getOrderList();
      }
    })
  }
  getOrderList(){
  this.order.orderList().subscribe((res)=>{
this.orderData=res;
console.log("orderData=>",this.orderData);
  })
}
loadDetails() {
  this.product.currentCart().subscribe((res) => {
    this.checkoutData = res;
    console.log("checkout data=>",this.checkoutData)



    this.singleUserCheckoutData = res;
    console.log("single user cart data=>", this.singleUserCheckoutData);
  })
}
statusChanged(){


  this.orderStatusMsg = "Cancelled";
}
}
