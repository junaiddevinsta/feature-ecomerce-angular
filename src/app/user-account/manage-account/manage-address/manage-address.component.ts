import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit {
  isModalOpenShipping = false;
  isModalOpenBilling = false;
shippingData:any;
billingData:any;
  shippingForm = new FormGroup({
    id:new FormControl(localStorage.getItem('userid')),
    shippingAddress: new FormControl('', [Validators.required]),
    ShippingphoneNo: new FormControl('', [Validators.required, Validators.pattern('^((\\+92-?)|0)?[0-9]{10}$')]),

  })
  billingForm = new FormGroup({
    id:new FormControl(localStorage.getItem('userid')),
    billingAddress: new FormControl('', [Validators.required]),
    billingphoneNo: new FormControl('', [Validators.required, Validators.pattern('^((\\+92-?)|0)?[0-9]{10}$')]),

  })
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getShippingData();
    this.getBillingData();
  }
getShippingData(){
  this.apiService.getrequest('register/'+ localStorage.getItem('userid')).subscribe((result)=>{
    if(result){
      this.shippingData=result;
      // console.log("Shipping address=>",this.shippingData)
      this.shippingForm.patchValue({
        shippingAddress:this.shippingData.shippingAddress,
        ShippingphoneNo:this.shippingData.ShippingphoneNo,
            })
      this.shippingData=result;
      console.log("Shipping address=>",this.shippingData)
    }
  })
}
getBillingData(){
  this.apiService.getrequest('register/'+ localStorage.getItem('userid')).subscribe((result)=>{
    if(result){
      this.billingData=result;
      console.log("Shipping address=>",this.shippingData)
      this.billingForm.patchValue({
        billingAddress:this.billingData.billingAddress,
        billingphoneNo:this.billingData.billingphoneNo,
            })

      console.log("Billing address=>",this.billingData)
    }
  })
}
  shippingDataUpdate(){
    console.log('Profile data =>', this.shippingForm.value);
    const patchData = {

      // fname: this.resToForm.controls['fname'].value,
      // email: this.resToForm.controls['email'].value,
      // phone:this.resToForm.controls['phone'].value,
      // image:this.resToForm.controls['image'].value
      shippingAddress: this.shippingForm.value.shippingAddress,
        shippingphoneNo: this.shippingForm.value.ShippingphoneNo,


      };
    this.apiService.patchRequest('register/'+ localStorage.getItem('userid'),patchData).subscribe(async(res:any)=>{
      if(res){
        this.closeModalShipping()
        // this.toast.UpdateProfileToast();
        this.getShippingData();
        console.log("shipping Data update successful",res);
      }
    })
  }
  billingDataUpdate(){
    console.log('Profile data =>', this.billingForm.value);
    const patchData = {
      billingAddress: this.billingForm.value.billingAddress,
      billingphoneNo: this.billingForm.value.billingphoneNo,


      };
    this.apiService.patchRequest('register/'+ localStorage.getItem('userid'),patchData).subscribe(async(res:any)=>{
      if(res){
        this.closeModalBilling()
        // this.toast.UpdateProfileToast();
        this.getBillingData();
        console.log("Billing Data update successful",res);
      }
    })
  }
  openModalShipping() {
    this.isModalOpenShipping = true;
    console.log("shipping")
  }

  closeModalShipping() {
    this.isModalOpenShipping = false;
  }
  openModalBilling() {
    this.isModalOpenBilling = true;
    console.log("billing")
  }

  closeModalBilling() {
    this.isModalOpenBilling = false;
  }
  get inputControls() {
    return this.shippingForm.controls;
  }
  get inputControlsBilling() {
    return this.billingForm.controls;
  }

}
