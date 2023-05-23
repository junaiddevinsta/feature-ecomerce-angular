import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl,FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private apiService:ApiService, private authService:AuthService, private route:Router) { }

  ngOnInit(): void {
  }
  get email(): AbstractControl {
    return this.loginForm.controls['email'];
  }

  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }
  login() {
    if (this.loginForm.valid) {
      const email = this.email.value;
      const password = this.password.value;


      this.authService.checkExistingUser(email, password).subscribe(
        (response: any) => {
                  const apiToken = this.generateApiToken();


        localStorage.setItem('apiToken', apiToken);

          const userExists = response.some((user: any) => user.email === email && user.password===password);
          if (userExists) {

            this.authService.login(email, password).subscribe(
              (loginResponse: any) => {

                const authToken = loginResponse.token;
                this.authService.setAuthToken(authToken);

                console.log('Login successful');
              },
              (loginError: any) => {

                console.log('Login error');
              }
            );
          } else {

            alert('Username or password incorrect')
            console.log('User name or password incorrect');
          }
        },
        (error: any) => {

          console.log('API error');
        }
      );
    }
  }

generateApiToken(): string {

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 32;
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
  getLoginData(){
    console.log("loginData=>",this.loginForm.value)
  }
  get inputControls() {
    return this.loginForm.controls;
  }

}
