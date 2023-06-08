import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit {
  isModalOpen = false;
shippingData:any;
  resToForm = new FormGroup({
    id:new FormControl(localStorage.getItem('userid')),
    shippingAddress: new FormControl('', [Validators.required]),
    ShippingphoneNo: new FormControl('', [Validators.required, Validators.pattern('^((\\+92-?)|0)?[0-9]{10}$')]),

  })
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getShippingData();
  }
getShippingData(){
  this.apiService.getrequest('register/'+ localStorage.getItem('userid')).subscribe((result)=>{
    if(result){
      this.shippingData=result;
      console.log("Shipping address=>",this.shippingData)
    }
  })
}
  shippingDataUpdate(){
    console.log('Profile data =>', this.resToForm.value);
    this.apiService.putRequest('register/'+ localStorage.getItem('userid'),this.resToForm.value).subscribe(async(res:any)=>{
      if(res){
        this.closeModal()
        // this.toast.UpdateProfileToast();
        this.getShippingData();
        console.log("shipping Data update successful",res)
      }
    })
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  get inputControls() {
    return this.resToForm.controls;
  }

}
