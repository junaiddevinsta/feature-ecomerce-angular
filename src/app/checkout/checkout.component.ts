import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl,FormGroup,Validators,} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, checkout, order, priceSummary } from '../data-type';
import { CheckoutService } from '../services/checkout.service';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrNotificationService } from '../services/toastr-notification.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  resToForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^((\\+92-?)|0)?[0-9]{10}$')]),
    email: new FormControl('', [Validators.required,Validators.email,]),
     });
  constructor(private product:ProductService,private checkout:CheckoutService, private alert:AlertService, private route:Router, private toastr:ToastrNotificationService) { }

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
      this.totalPrice = price + (price / 10) + 100 - (price / 10);
      // this.singleProductPrice=this.singleUserCartData?.quantity * this.singleUserCartData
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
      console.log('price summary=>', this.priceSummary)
      console.log('price=>', price)
      this.singleUserCheckoutData = res;
      console.log("single user cart data=>", this.singleUserCheckoutData);
    })
  }

  get inputControls() {
    return this.resToForm.controls;
  }
alertOrderPlaced(){
  this.alert.orderPlaced();
}
}