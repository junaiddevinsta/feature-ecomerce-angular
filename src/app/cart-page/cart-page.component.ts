import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, coupon, priceSummary } from '../data-type';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrNotificationService } from '../services/toastr-notification.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  couponData=0;
  discountCode:any;
  cartRemoveData: cart[] | undefined;
  check=true;
  // coupon:any;
  singleProductPrice: any;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
    quantity: 0,

  }


  resToForm = new FormGroup({
    coupon: new FormControl('',),
});
  singleUserCartData: any;
  constructor(private product: ProductService, private route:Router, private alert:AlertService, private apiService:ApiService, private toast:ToastrNotificationService) { }
  ngOnInit(): void {
    this.loadDetails();
    // this.couponCode();
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

      this.priceSummary.discount = this.couponData ? price / this.couponData : 0;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - this.priceSummary.discount;
      console.log('price summary=>', this.priceSummary)
      console.log("total price=>")
      console.log('price=>', price)
      this.singleUserCartData = res;
      console.log("discount value=>",this.priceSummary.discount);
      console.log("single user cart data=>", this.singleUserCartData);
    })
    // this.couponCode();

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

 console.log("coupooon Data=>",this.couponData)
 const couponCode = res.some((c: any) => c.code === coupon.coupon );
 // const couponCode =  this.apiService.getPersons().find(x => x.id == this.personId);
 console.log("coupen code=>",couponCode)
 this.discountCode=res[0].code;
 console.log("discount code=>",this.discountCode)

 if(!couponCode){
this.toast.errorCoupon();
   console.log("code not exists")
 }
 else{
  this.couponData=res[0].coupon_discount;
  this.apiService.postRequest('usedCoupon',this.resToForm.value).subscribe((response:any)=>{
    if(response){
      console.log("discount code=>",response)
    }
  })
   console.log("code exists");

   this.toast.CouponApplyToast();
 }
 this.loadDetails();
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
  removeCode(){
    this.product.currentCart().subscribe((res) => {
      if(!res){
        return;
      }

      // delete res.discount;
      this.cartRemoveData = res;
      console.log("remove code=>",this.cartRemoveData)
      let price = 0
      res.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)

        }
      })
      this.apiService.getrequest('coupon').subscribe((result:any)=>{
        if(result){

          console.log("coupon result=>",result)
          this.priceSummary.price = price;
          delete result.discount
          this.priceSummary.discount =  0;
          this.priceSummary.tax = price / 10;
          this.priceSummary.delivery = 100;
          this.priceSummary.total = price + (price / 10) + 100 - this.priceSummary.discount;
          console.log('price summary=>', this.priceSummary)
          console.log("total price=>")
          console.log('price=>', price)
          this.singleUserCartData = res;
          console.log("discount value=>",this.priceSummary.discount);
          // console.log("single user cart data=>", this.singleUserCartData);
          this.resToForm.reset();
        }

      })
      // this.singleProductPrice=this.singleUserCartData?.quantity * this.singleUserCartData


    })
    this.loadDetails();
  }
}
