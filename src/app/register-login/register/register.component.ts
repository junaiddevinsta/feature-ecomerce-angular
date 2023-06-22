import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl,FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  users: any = [];
  resToForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  constructor(private apiService: ApiService, private http: HttpClient, private route:Router, private authService:AuthService, private toastr:ToastrNotificationService) {}

  ngOnInit(): void {
    // this.onSubmit();
  }
  get inputControls() {
    return this.resToForm.controls;
  }
  getData() {
    console.log('data=>', this.resToForm.value);
  }
  registerUser() {
    console.log('register form data =>', this.resToForm.value);
    const data = {
      fname: this.resToForm.value.fname,
      email: this.resToForm.value.email,
      password: this.resToForm.value.password,
    };
    console.log('Data =>', data);

    if(this.resToForm.valid){
      const email = this.email.value;
      this.authService.checkExistingUser(email).subscribe(
        (response: any) => {


          const userExists = response.some((user: any) => user.email === email );
          if (!userExists) {
            this.apiService.postRequest('register', data).subscribe((res:any)=>{
              console.log('Register successful',res);
              this.toastr.successToastRegister('Registered', res.message)
              const apiToken = this.authService.generateApiToken();
              localStorage.getItem('res.id');
              localStorage.getItem('res.fname');
              localStorage.setItem('apiToken', apiToken);
              localStorage.setItem('userid', res.id);
        localStorage.getItem('apiToken');
        //       console.log('response register',res);

        //               localStorage.setItem('apiToken', apiToken);
                      // alert('SIGNUP SUCCESSFUL');
                      this.route.navigate([''])
                      console.log("sucess")
            })

          } else if(userExists) {

            this.toastr.ToastEmailAlreadyExists('Error')
            console.log('Email Already Registered');
          } else{
            alert('Register Failed')
            console.log('Register Failed');
          }
        },
        (error: any) => {
this.toastr.errorToast('Error')
          console.log('API error');
        }
      );
    }
  }
  matchPassword() {
    if(this.confirmPassword.value===!''){
      if (this.confirmPassword.value == this.password.value) {
        this.confirmPassword.setErrors(null);
        // this.route.navigate(['/login'])
      } else {
        this.confirmPassword.setErrors({ mismatch: true });
      }
    }

  }
  // matchPassword() {
  //   if(this.confirmPassword.value===''){
  //     if (this.confirmPassword.value === this.password.value) {
  //       this.confirmPassword.setErrors(null);
  //       // this.route.navigate(['/login'])
  //     }
  //   }
  //    else {
  //     this.confirmPassword.setErrors({ mismatch: true });
  //   }
  // }
  // getting the form control elements
  get password(): AbstractControl {
    return this.resToForm.controls['password'];
  }
  get confirmPassword(): AbstractControl {
    return this.resToForm.controls['confirmPassword'];
  }


  get email(): AbstractControl {
    return this.resToForm.controls['email'];
  }
  checkUserExists(){


  }
}
function elseif(userExists: any) {
  throw new Error('Function not implemented.');
}

