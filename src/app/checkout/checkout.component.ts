import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl,FormGroup,Validators,} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, checkout, order, priceSummary } from '../data-type';
import { CheckoutService } from '../services/checkout.service';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrNotificationService } from '../services/toastr-notification.service';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  coupon: any;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  couponData=0;
  couponCodeValue:any;
  resToForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^((\\+92-?)|0)?[0-9]{10}$')]),
    email: new FormControl('', [Validators.required,Validators.email,]),
     });
  constructor(private product:ProductService,private checkout:CheckoutService, private alert:AlertService, private route:Router, private toastr:ToastrNotificationService, private apiService:ApiService) { }

checkoutData: checkout[] | undefined;
singleUserCheckoutData: any;
priceSummary: priceSummary = {
  price: 0,
  discount: 0,
  tax: 0,
  delivery: 0,
  total: 0,
  quantity: 0,

}
singleUserCartData: any;
  ngOnInit(): void {
    this. loadDetails();
    this.couponCode();
  }
  orderNow(data: { email: string, address: string, contact: string }){
    let user = localStorage.getItem('userid');
        let userId= user && JSON.parse(user);
        console.log("total price=>",this.totalPrice)
    // const formData = {
    //   address: this.resToForm.value.address,
    //   phone: this.resToForm.value.phone,
    //   email: this.resToForm.value.email,
    // };
    if(this.totalPrice){
      let orderData:order = {
        ...data,
        totalPrice: this.totalPrice,
        coupon:this.coupon,
        userId,
  id: undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700)
      })
      this.checkout.orderNow(orderData).subscribe((res)=>{
        console.log("order response=>",res)
        if(res){
          console.log("coupon Response Data=>",this.couponData)
          const couponResponseData={
            couponCodeValue:this.couponCodeValue,
            userId
          }
          console.log("coupon Response Data=>",couponResponseData)
          this.apiService.postRequest('usedCoupon',couponResponseData).subscribe((couponCodeRes)=>{
console.log("value added in used coupon success=>",couponCodeRes)
          })
          this.toastr.successToastOrderPlaced('Order Placed Successfull')
          // this.alert.orderPlaced();

          console.log("Order placed successfully")
          // this.route.navigate(['/order-complete']);
          setTimeout(() => {
            this.orderMsg = undefined;
            this.route.navigate(['/order-complete'])
          }, 4000);

        }
      })
    }
    // console.log('Data =>', formData);
  }
  loadDetails() {
    this.product.currentCart().subscribe((res) => {
      this.checkoutData = res;
      console.log("checkout data=>",this.checkoutData)
      let price = 0
      this.cartData=res;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)

        }
      })

      this.totalPrice = price + (price / 10) + 100 - this.priceSummary.discount;
      // this.singleProductPrice=this.singleUserCartData?.quantity * this.singleUserCartData
      this.priceSummary.price = price;
      this.priceSummary.discount = this.couponData ? price / this.couponData : 0;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - this.priceSummary.discount;
      console.log('price summary=>', this.priceSummary)
      console.log('price=>', price)
      this.singleUserCheckoutData = res;
      console.log("single user cart data=>", this.singleUserCheckoutData);
    })
  }

  get inputControls() {
    return this.resToForm.controls;
  }
  couponCode(){

    // const coupon={
    //   coupon:this.resToForm.value.coupon
    // }

    // console.log("coupon=>",coupon)
    this.apiService.getrequest('coupon').subscribe((res:any)=>{
      if(res){
        if(localStorage.getItem('userid')){
     // console.log("Response=>",res)
    //  const couponCode = res.some((c: any) => c.code === coupon.coupon );
     this.couponData=res[0].coupon_discount;
     this.couponCodeValue=res[0].code;
     console.log("coupon code value=>",this.couponCodeValue)
     console.log("coupooon Data=>",this.couponData)
     console.log("coupon coupon=>",res)
     // const couponCode =  this.apiService.getPersons().find(x => x.id == this.personId);
    //  console.log("coupen code=>",couponCode)

    //  if(!couponCode){
    //    console.log("code not exists")
    //  }
    //  else{
    //    console.log("code exists");
    //  }
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

alertOrderPlaced(){
  this.alert.orderPlaced();
}

}
