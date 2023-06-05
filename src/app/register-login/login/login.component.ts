import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl,FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { cart, product, wishlist } from 'src/app/data-type';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email,]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService:AuthService, private product:ProductService ,private route:Router, private toastr:ToastrNotificationService) { }

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
      

      this.authService.checkExistingUser(email).subscribe(
        (response: any) => {
                  const apiToken = this.authService.generateApiToken();
localStorage.getItem('response[0].id');
localStorage.getItem('response[0].fname');
console.log('response',response);

        localStorage.setItem('apiToken', apiToken);
        localStorage.getItem('apiToken')
       
        localStorage.setItem('userid', response[0].id);

          const userExists = response.some((user: any) => user.email === email && user.password===password);
          if (userExists) {

            // this.authService.login(email, password).subscribe(
              // (loginResponse: any) => {
                this.localWishlistToRemote();
                this.localCartToRemoteCart();
                const authToken = response.token;
                this.authService.setAuthToken(authToken);
this.toastr.successToastLogin('LoggedIn')
                console.log('Login successful');
                this.route.navigate([''])
              }
              // (loginError: any) => {

              //   console.log('Login error');
              // }
            // );
          // } 
          else {
this.toastr.errorToastLogin('Incorrect Username or Password')
            // alert('Username or password incorrect')
            console.log('User name or password incorrect');
          }
        },
        (error: any) => {
          this.toastr.errorToast('Error')
          console.log('API error');
        }
      );
    }
  }

// generateApiToken(): string {

//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const tokenLength = 32;
//   let token = '';
//   for (let i = 0; i < tokenLength; i++) {
//     token += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return token;
// }
  getLoginData(){
    console.log("loginData=>",this.loginForm.value)
  }
  get inputControls() {
    return this.loginForm.controls;
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('userid');
    let userId= user && JSON.parse(user);
    console.log('userId',userId);
    console.log('user',user);
      console.log('local cart',localStorage.getItem('localCart'))
    if(data){
      let cartDataList:product[]= JSON.parse(data);
      
      cartDataList.forEach((product:product, index)=>{
        let cartData:cart={
          ...product,
          productId:product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.log("data is stored in DB",result);
            }
          })
        }, 500);
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId);
     }, 2000);
    // this.product.getCartList(userId);
    // console.log('cartUserId',userId)
    // console.log('cartUser',user)


    }

    localWishlistToRemote(){
      let data = localStorage.getItem('wishlist');
      let user = localStorage.getItem('userid');
      let userId= user && JSON.parse(user);
      console.log('userId',userId);
      console.log('user',user);
        console.log('local wishlist',localStorage.getItem('wishlist'))
      if(data){
        let wislistlistList:product[]= JSON.parse(data);
        
        wislistlistList.forEach((product:product, index)=>{
          let wishlistData:wishlist={
            ...product,
            productId:product.id,
            userId
          }
          delete wishlistData.id;
          setTimeout(() => {
            this.product.addToWishlist(wishlistData).subscribe((result)=>{
              if(result){
                console.log("data is stored in DB",result);
              }
            })
          }, 500);
          if(wislistlistList.length===index+1){
            localStorage.removeItem('wishlist')
          }
        })
      }
      setTimeout(() => {
        this.product.getWishlistList(userId);
       }, 2000);
      // this.product.getCartList(userId);
      // console.log('cartUserId',userId)
      // console.log('cartUser',user)
  
  
      }

}
