import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  resToForm = new FormGroup({
    id:new FormControl(localStorage.getItem('userid')),
    password: new FormControl('', [Validators.required]),
    confirmPassword:new FormControl('', [Validators.required])


  })
  constructor(private apiService:ApiService, private alert:AlertService) { }

  ngOnInit(): void {
  }
  getPasswordUpdateData(){
    if (this.resToForm.invalid) {
      this.resToForm.markAllAsTouched();
      return;
    }
    console.log('password =>', this.resToForm.value);
    const patchData = {

      // fname: this.resToForm.controls['fname'].value,
      // email: this.resToForm.controls['email'].value,
      // phone:this.resToForm.controls['phone'].value,
      // image:this.resToForm.controls['image'].value
      password: this.resToForm.value.password,
      confirmPassword: this.resToForm.value.confirmPassword,


      };

    this.apiService.patchRequest('register/'+ localStorage.getItem('userid'),patchData).subscribe(async(res:any)=>{
      if(res){

        this.alert.passwordUpdateSuccessful();
        // this.getUserProfile();
        console.log("Password Change successful",res)
      }
    })
    this.resToForm.reset();
  }
  // getPasswordData(){
  //   const data={
  //     password:this.resToForm.value.password,
  //     confirmPassword:this.resToForm.value.confirmPassword
  //   }
  //   console.log("get password fields data",data)
  // }

  // matchPassword() {
  //   if(this.confirmPassword.value===!''){
  //     if (this.confirmPassword.value === this.password.value) {
  //       this.confirmPassword.setErrors(null);
  //       // this.route.navigate(['/login'])
  //     }
  //   }
  //    else {
  //     this.confirmPassword.setErrors({ mismatch: true });
  //   }
  // }
  matchPassword() {
    // if(this.confirmPassword.value===!''){
      if (this.confirmPassword.value == this.password.value) {
        this.confirmPassword.setErrors(null);
        // this.route.navigate(['/login'])
      } else {
        this.confirmPassword.setErrors({ mismatch: true });
      // }
    }

  }
  // getting the form control elements
  get password(): AbstractControl {
    return this.resToForm.controls['password'];
  }
  get confirmPassword(): AbstractControl {
    return this.resToForm.controls['confirmPassword'];
  }
  get inputControls() {
    return this.resToForm.controls;
  }
}
