import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  isModalOpen = false;
  msg = "";
  message="";
  url: any;
  profileData:any
  resToForm = new FormGroup({
    id:new FormControl(localStorage.getItem('userid')),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^((\\+92-?)|0)?[0-9]{10}$')]),
    image: new FormControl('',[Validators.required]),
  })
  constructor(private apiService:ApiService, private toast:ToastrNotificationService) { }
getUserProfile(){
  this.apiService.getrequest('register/'+ localStorage.getItem('userid')).subscribe((result)=>{
    if(result){
      this.profileData=result;
      console.log("user Profile=>",this.profileData)
    }
  })
}

getProfileUpdateData(){
  console.log('Profile data =>', this.resToForm.value);
  this.apiService.putRequest('register/'+ localStorage.getItem('userid'),this.resToForm.value).subscribe(async(res:any)=>{
    if(res){
      this.closeModal()
      this.toast.UpdateProfileToast();
      this.getUserProfile();
      console.log("data update successful",res)
    }
  })
}
  openModal() {
    this.isModalOpen = true;
  }
  selectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

    var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
      const img: any = reader.result;
      const splitImage = img.split("base64,");
			this.url = splitImage ? splitImage[1] : '';

      console.log("image url=>",this.url)
		}

  }
  ngOnInit(): void {
    this.getUserProfile()
  }
  closeModal() {
    this.isModalOpen = false;
  }
  get inputControls() {
    return this.resToForm.controls;
  }

}
