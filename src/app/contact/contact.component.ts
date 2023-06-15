import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrNotificationService } from '../services/toastr-notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  resToForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
    message:new FormControl('', [Validators.required])
  });
  constructor(private apiService:ApiService, private toast:ToastrNotificationService ) { }

  ngOnInit(): void {
  }
  contactUs(){
    const data = {
      fname: this.resToForm.value.fname,
      email: this.resToForm.value.email,
      message: this.resToForm.value.message,
    };
    console.log('Data =>', data);
    this.apiService.postRequest('contact',data).subscribe((res)=>{
      if(res){
        this.toast.messageSentToast();
        console.log("message send successfully",res)
      }
    })

  }
  get inputControls() {
    return this.resToForm.controls;
  }


}
