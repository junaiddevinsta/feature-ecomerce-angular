import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product, wishlist } from 'src/app/data-type';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productQuantity:number=1;
sub:any;
productData:any;
removeCart=false;
removeWishlist=false;
couponDisount:any
cartData:product|undefined;
wishlistData:product|undefined;
currentCartResponse:any;
  constructor(private route:ActivatedRoute, private alert:AlertService  ,private apiService:ApiService, private product:ProductService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const productId = +params['id'];
     console.log('product id=>', productId);
     this.getProductData(productId)
      // this.getBlogDetails(id);
      // this.getCategory(id)// (+) converts string 'id' to a number
      let user = localStorage.getItem('userid');
      if(user){
        let userId= user && JSON.parse(user);
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
          let item=result.filter((item:product)=>productId?.toString()===item.productId?.toString())
        if(item.length){
          this.cartData=item[0];
        this.removeCart=true;
        }
        })
      }
      let userwishlist = localStorage.getItem('userid');
      if(userwishlist){
        let userId= user && JSON.parse(user);
        this.product.getWishlistList(userId);
        this.product.wishlistData.subscribe((result)=>{
          let itemwishlist=result.filter((item:product)=>productId?.toString()===item.productId?.toString())
        if(itemwishlist.length){
          this.wishlistData=itemwishlist[0]
          this.removeWishlist=true;
        }
        })
      }



    });
  }
  getProductData(id:any){
    this.apiService.getrequest('products/'+id).subscribe((res:any)=>{
      this.productData=res;
      console.log("Product Data=>",this.productData)
      console.log("res=>",res)
    })
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }
addToCart(){
  if(this.productData){
    this.productData.quantity=this.productQuantity;
    if(!localStorage.getItem('userid')){
      this.product.localAddToCart(this.productData);
      this.removeCart=true
    }
    else{
      let user = localStorage.getItem('userid');
        let userId= user && JSON.parse(user);
        console.log('userId786',userId);
        let cartData:cart={
          ...this.productData,
          productId:this.productData.id,
          userId,
          couponDisount:this.couponDisount
        }
        delete cartData.id;
        console.log('cart Data',cartData);
        this.product.addToCart(cartData).subscribe((res)=>{
          if(res){
            this.product.getCartList(userId);
            this.removeCart=true;
            this.alert.addedCartAlert();
            // alert('data added successfully')
            this.product.currentCart().subscribe((respone:any)=>{
              this.currentCartResponse=respone
              console.log("current cart response=>",this.currentCartResponse)
            })
          }
        })
    }
  }
}
removeToCart(productId:number){
  if(!localStorage.getItem('userid')){
    this.product.removeItemFromCart(productId);

  }
  else{
    let user = localStorage.getItem('userid');
        let userId= user && JSON.parse(user);
    console.log("remove cart data=>",this.cartData)
    this.cartData && this.product.removeToCart(this.cartData.id).subscribe((res)=>{
      if(res){
        this.product.getCartList(userId);
        this.alert.removeCartAlert();
      }
    })
  }
  this.removeCart=false;
}
addToWishlist(){
  if(this.productData){
    // this.productData.quantity=this.productQuantity;
    if(!localStorage.getItem('userid')){
      this.product.localAddToWishlist(this.productData);
      this.removeWishlist=true
    }
    else{
      console.log('user logged In');
      let user = localStorage.getItem('userid');
        let userId= user && JSON.parse(user);
        console.log(' wishlistuserId786',userId);
        let wishlistData:wishlist={
          ...this.productData,
          productId:this.productData.id,
          userId
        }
        delete wishlistData.id;
        console.log('wishlist Data',wishlistData);
        this.product.addToWishlist(wishlistData).subscribe((res)=>{
          if(res){
            this.product.getWishlistList(userId);
            this.removeWishlist=true;
            this.alert.addedWishlistAlert();
            // alert('data added to wishlist successfully');
          }
        })
    }
  }
}
removeToWishlist(poductId:number){
  if(!localStorage.getItem('userid')){
    this.product.removeToCart(poductId);
  }
  else{
    let user = localStorage.getItem('userid');
        let userId= user && JSON.parse(user);
        console.log("remove wishlist Data=>",this.wishlistData);
        this.product.removeToWishlist(this.wishlistData?.id).subscribe((res)=>{
          if(res){
            this.product.getWishlistList(userId);
            this.alert.removeWishlistAlert();

          }
        })
  }
  this.removeWishlist=false;
}
//     addToWishlist(){
//     if(localStorage.getItem('apiToken')){
// console.log('user Login',this.productData);
// this.product.localAddToCart(this.productData);
//     }
//     else{
//       console.log('user not login')
//     }
//   }

}
