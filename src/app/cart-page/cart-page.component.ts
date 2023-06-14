import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, coupon, priceSummary } from '../data-type';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  couponData:coupon[]|undefined
  check=true;
  // coupon:any;
  singleProductPrice: any;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
    quantity: 0
  }
  resToForm = new FormGroup({
    coupon: new FormControl('',),

  });
  singleUserCartData: any;
  constructor(private product: ProductService, private route:Router, private alert:AlertService, private apiService:ApiService) { }

  ngOnInit(): void {
    this.loadDetails();
    this.couponCode();

  }


  removeToCart(cartId: number | undefined) {
    let user = localStorage.getItem('userid');
    let userId= user && JSON.parse(user);
    cartId && this.cartData && this.product.removeToCart(cartId)
      .subscribe((result) => {
        this.product.getCartList(userId);
        this.loadDetails();
      })
  }
  loadDetails() {
    this.product.currentCart().subscribe((res) => {
      // if(res){
      //   this.route.navigate(['/checkout'])
      // }
      this.cartData = res;
      let price = 0
      res.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)

        }
      })
      // this.singleProductPrice=this.singleUserCartData?.quantity * this.singleUserCartData
      this.priceSummary.price = price;
      // this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
      console.log('price summary=>', this.priceSummary)
      console.log('price=>', price)
      this.singleUserCartData = res;
      console.log("single user cart data=>", this.singleUserCartData);
    })
  }
  checkCheckoutData(){
    if(this.cartData?.length){
      this.route.navigate(['/checkout'])
    }
    else{
      this.alert.cartEmpty()
    }
  }
  get inputControls() {
    return this.resToForm.controls;
  }
  couponCode(){
const coupon={
  coupon:this.resToForm.value.coupon
}

console.log("coupon=>",coupon)
this.apiService.getrequest('coupon').subscribe((res:any)=>{
  if(res){
    if(localStorage.getItem('userid')){
 // console.log("Response=>",res)
 const couponCode = res.some((c: any) => c.code === coupon.coupon );
 this.couponData=res[0].coupon_discount;
 console.log("coupooon Data=>",this.couponData)
 // const couponCode =  this.apiService.getPersons().find(x => x.id == this.personId);
 console.log("coupen code=>",couponCode)

 if(!couponCode){
   console.log("code not exists")
 }
 else{
   console.log("code exists");
 }
    }

  }
})
//     this.apiService.getrequest('coupon').subscribe((res)=>{
//       if(res){
// this.coupon=res;
// console.log("coupon=>",this.coupon[0].code)
// if(this.coupon[0].code!=''){

// }
//       }
//     })
  }
}
