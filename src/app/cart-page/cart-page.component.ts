import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
singleUserCartData:any;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.singlecartData();

  }
singlecartData(){
  this.product.currentCart().subscribe((res)=>{
    this.cartData=res;
    let price=0
    res.forEach((item)=>{
      if (item.quantity) {
        price = price + (+item.price * +item.quantity)
      }
    })
    this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
      console.log('price summary=>',this.priceSummary)
    console.log('price=>',price)
    this.singleUserCartData=res;
    console.log("single user cart data=>",this.singleUserCartData)
  })
}
}
