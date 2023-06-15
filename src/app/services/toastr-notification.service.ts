import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr:ToastrService) { }

  showToastRegistered(){
    this.toastr.success("Registered Successfully!!", "Registered!!",
    {
      timeOut:1000,
      progressBar:true
    }
    )



  }
 successToastRegister(title?:string, msg?: string){
    // console.log("toastr")
    this.toastr.success(msg ? msg :"Successfully Registered",title ? title : "Registered",
    {
      timeOut:1000,
      progressBar:true
    }

    )



  }
  successToastLogin(title?:string, msg?: string){
    // console.log("toastr")
    this.toastr.success(msg ? msg :"Successfully Login",title ? title : "Logged In",
    {
      timeOut:1000,
      progressBar:true
    }

    )



  }
  successToastOrderPlaced(title?:string, msg?: string){
    // console.log("toastr")
    this.toastr.success(msg ? msg :"Successfully Order Placed",title ? title : "Order Placed",
    {
      timeOut:1000,
      progressBar:true
    }

    )
  }
  ToastEmailAlreadyExists(title?:string, msg?: string){
    this.toastr.error(msg ? msg :"Email Already Exists",title ? title : "Error",
    {
      timeOut:1000,
      progressBar:true
    }
    )



  }
  errorToast(title?:string, msg?: string){
    this.toastr.error(msg ? msg :"Operation Fail",title ? title : "Error",
    {
      timeOut:1000,
      progressBar:true
    }
    )



  }
  errorToastLogin(title?:string, msg?: string){
    this.toastr.error(msg ? msg :"Incorrect Username Or  Password",title ? title : "Error",
    {
      timeOut:1000,
      progressBar:true
    }
    )



  }
  apiErrorToast(title?:string, msg?: string){
    this.toastr.error(msg ? msg :"Api Error",title ? title : "Error",
    {
      timeOut:3000,
      progressBar:true
    }
    )



  }
  UpdateProfileToast(title?:string, msg?: string){
    // console.log("toastr")
    this.toastr.success(msg ? msg :"Profile Update Successfully",title ? title : "Profile Update",
    {
      timeOut:1000,
      progressBar:true
    }

    )
  }
  CouponApplyToast(title?:string, msg?: string){
    // console.log("toastr")
    this.toastr.success(msg ? msg :"Coupon Applies Successfully",title ? title : "Coupon Apply",
    {
      timeOut:1000,
      progressBar:true
    }

    )
  }
  errorCoupon(title?:string, msg?: string){
    // console.log("toastr")
    this.toastr.error(msg ? msg :"Coupon Not Valid",title ? title : "Error",
    {
      timeOut:1000,
      progressBar:true
    }

    )
  }
  messageSentToast(title?:string, msg?: string){
    // console.log("toastr")
    this.toastr.success(msg ? msg :"Message sent",title ? title : "Success",
    {
      timeOut:1000,
      progressBar:true
    }

    )
  }
}
