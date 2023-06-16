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
  codeCoupon=false;
  usedCoupon:any;
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
    let user = localStorage.getItem('userid');
    let userId= user && JSON.parse(user);
const coupon={
  coupon:this.resToForm.value.coupon,
  userId
}

console.log("coupon=>",coupon)
this.apiService.getrequest('coupon').subscribe((res:any)=>{
  if(res){
    if(localStorage.getItem('userid')){
 // console.log("Response=>",res)
 this.apiService.getrequest('usedCoupon').subscribe((usedCouponResponse)=>{
  if(usedCouponResponse){
    this.usedCoupon=usedCouponResponse;
    console.log("used Coupon Response=>",this.usedCoupon)
    const usedcoupon={
      coupon:this.resToForm.value.coupon,
      userId
    }
    const usedCouponCode = this.usedCoupon.some((c: any) => c.coupon === usedcoupon.coupon && c.userId===usedcoupon.userId );
    console.log("usedCouponCode=>",usedCouponCode)
    if(!usedCouponCode){
        this.couponData=res[0].coupon_discount;
   console.log("code exists");
this.codeCoupon=true;
this.apiService.postRequest('usedCoupon',coupon).subscribe((usedCouponResponse:any)=>{
  if(usedCouponResponse){
    console.log("discount code=>",usedCouponResponse)
    // const usedCouponCode = usedCouponResponse.some((c: any) => c.code === coupon.coupon && c.userId===coupon.userId );
    // console.log("used coupon code=>",usedCouponCode)

  }
})
   this.toast.CouponApplyToast();
      console.log("coupon don't valid")
    }
    else{
      this.toast.errorCoupon();
      console.log("coupon Not valid")
    }
  }
  if(!usedCouponResponse){

  }

})

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


//  else{
//   this.couponData=res[0].coupon_discount;
//    console.log("code exists");
// this.codeCoupon=true;
// this.apiService.postRequest('usedCoupon',coupon).subscribe((usedCouponResponse:any)=>{
//   if(usedCouponResponse){
//     console.log("discount code=>",usedCouponResponse)
//     // const usedCouponCode = usedCouponResponse.some((c: any) => c.code === coupon.coupon && c.userId===coupon.userId );
//     // console.log("used coupon code=>",usedCouponCode)

//   }
// })
//    this.toast.CouponApplyToast();
//  }
 this.loadDetails();
    }

  }
})
// this.apiService.postRequest('usedCoupon',coupon).subscribe((response:any)=>{
//   if(response){
//     console.log("discount code=>",response)
//   }
// })
// this.apiService.getrequest('usedCoupon').subscribe((usedCouponResponse)=>{
//   if(usedCouponResponse){
//     this.usedCoupon=usedCouponResponse;
//     console.log("used Coupon Response=>",this.usedCoupon)

//     const couponCode = this.usedCoupon.some((c: any) => c.code === coupon.coupon && c.userId===coupon.userId );
//     console.log("usedCouponCode=>",couponCode)
//     if(!couponCode){
//       console.log("coupon not exist")
//     }
//     else{
//       console.log("coupon exist")
//     }
//   }

// })

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
          this.codeCoupon=false;
        }

      })
      // this.singleProductPrice=this.singleUserCartData?.quantity * this.singleUserCartData


    })
    this.loadDetails();
  }
}
