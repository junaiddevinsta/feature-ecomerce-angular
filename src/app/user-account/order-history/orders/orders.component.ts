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
  singleUserCheckoutData:any
  constructor(private order:OrderService, private product:ProductService, private alert:AlertService) { }

  ngOnInit(): void {
    this.getOrderList();
    this.loadDetails();
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.order.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.alert.cancelOrder();
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
}
