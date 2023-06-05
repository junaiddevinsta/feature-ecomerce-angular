import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
singleUserCartData:any;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    // this.cartData();
  }
cartData(){
  this.product.currentCart().subscribe((res)=>{
    this.singleUserCartData=res;
    console.log("single user cart data=>",this.singleUserCartData)
  })
}
}
