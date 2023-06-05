import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItems=0;
  wishlistItems=0;
  categoryData:any
  display = false;
  toggle(){
    this.display=!this.display
  }
  constructor(private authService:AuthService,private route:Router, private product:ProductService) { }

  ngOnInit(): void {

// this.getCategoriesData();
console.log("categories data")
let cartData= localStorage.getItem('localCart');
if(cartData){
  this.cartItems= JSON.parse(cartData).length
}
this.product.cartData.subscribe((items)=>{
  this.cartItems= items.length
  console.log('cart length',items)
});
let wishlistData= localStorage.getItem('localwishlist');
if(wishlistData){
  this.wishlistItems= JSON.parse(wishlistData).length
}
this.product.wishlistData.subscribe((items)=>{
  this.wishlistItems= items.length
  console.log('wishlist length',items)
});
if(localStorage.getItem('userid')){
  let user = localStorage.getItem('userid');
        let userId= user && JSON.parse(user);
  this.product.getCartList(userId);
  this.product.getWishlistList(userId);
}
  }

  isLogged() {

    // localStorage.clear();
    // this.product.cartData.emit([]);
    return this.authService.isLogged()


  }
 logout(){
    localStorage.clear();
    this.product.cartData.emit([]);
    this.product.wishlistData.emit([])
    this.route.navigate(['/login'])
  }
  gotoSearch(){
    this.route.navigate(['search']);
  }
//   getCategoriesData(){
//     this.apiService.getrequest('categories').subscribe((res:any)=>
//     {

//       this.categoryData=res;
//       console.log('categories Data res',this.categoryData)
//     })
// }
}
