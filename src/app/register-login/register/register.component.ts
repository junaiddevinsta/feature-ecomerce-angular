import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl,FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private apiService: ApiService, private http: HttpClient, private route:Router) {}

  ngOnInit(): void {
    this.onSubmit();
  }
  get inputControls() {
    return this.resToForm.controls;
  }
  getData() {
    console.log('data=>', this.resToForm.value);
  }
  getRegister() {
    console.log('register form data =>', this.resToForm.value);
    const data = {
      fname: this.resToForm.value.fname,
      email: this.resToForm.value.email,
      password: this.resToForm.value.password,
      confirmPassword: this.resToForm.value.confirmPassword,
    };
    console.log('Data =>', data);

    const emailValue = this.resToForm.value.email ?? '';
    if (emailValue !== '') {
      if (this.isEmailAlreadyRegistered(emailValue)) {
        console.log('Email exists');
        alert('Email already exists');
      } else {
        this.apiService.postRequest('signupUsersList', data).subscribe(
          (res: any) => {
            console.log('Register successful');
            alert('SIGNUP SUCCESSFUL');
            this.route.navigate(['/login'])
          },
          (err: any) => {
            console.log('Something went wrong');
            // alert("Something went wrong");
          }
        );
      }
    } else {
      console.log('Invalid email value');
      // Handle the case when the email value is invalid or empty
    }
  }
  onConfirmPassword() {
    if (this.confirmPassword.value == this.password.value) {
      this.confirmPassword.setErrors(null);
      // this.route.navigate(['/login'])
    } else {
      this.confirmPassword.setErrors({ mismatch: true });
    }
  }
  // getting the form control elements
  get password(): AbstractControl {
    return this.resToForm.controls['password'];
  }
  get confirmPassword(): AbstractControl {
    return this.resToForm.controls['confirmPassword'];
  }
  onSubmit() {
    this.apiService
      .getrequest('signupUsersList')
      .subscribe((registerData: any) => {
        this.users = registerData;
        console.log('users=>', this.users);
      });
  }
  isEmailAlreadyRegistered(email: string): boolean {
    return this.users.some((user: { email: string }) => user.email === email);
  }
}
