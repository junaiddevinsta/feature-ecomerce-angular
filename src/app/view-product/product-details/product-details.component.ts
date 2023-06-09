import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product, wishlist,variation} from 'src/app/data-type';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductsService } from 'src/app/services/products.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  currentPrice: number | undefined;
  selectedSize='';
  selectedColor = 'red';
  productQuantity:number=1;
  // cartData:any;
sub:any;
productData:any;
removeCart=false;
removeWishlist=false;
couponDisount:any
cartData:any;
wishlistData:product|undefined;
currentCartResponse:any;
btnValue = 'medium';
quantityVariation:any;

cartId:any;
  constructor(private route:ActivatedRoute, private alert:AlertService  ,private apiService:ApiService, private product:ProductService) { }


  ngOnInit(): void {
    if (this.productData?.variations?.length > 0) {
      this.selectedSize = this.productData.variations[0].size;
    }
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
    // Set default size
  if (this.productData?.variations?.length > 0) {
    this.selectedSize = this.productData.variations[0].size;
    this.currentPrice = this.productData.variations[0].price;
  }
  }
  getProductData(id:any){
    this.apiService.getrequest('products/'+id).subscribe((res:any)=>{
      this.productData=res;
      console.log("Product Data=>",this.productData)
      console.log("res=>",res)
      if (this.productData?.variations?.length > 0) {
        this.selectedSize = this.productData.variations[0].size;
        // this.selectedSize = this.productData.variations[0].price;
      }

    })
  }


  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }
  // addToCart() {
  //   if (this.productData && this.selectedSize) {
  //     this.productData.quantity = this.productQuantity;

  //     const selectedVariation: variation | undefined = this.productData.variations.find((variation: variation) => variation.size === this.selectedSize);
  //     if (!selectedVariation) {
  //       return;
  //     }

  //     if (!localStorage.getItem('userid')) {
  //       this.product.localAddToCart(this.productData);
  //     } else {
  //       let user = localStorage.getItem('userid');
  //       let userId = user && JSON.parse(user);
  //       let cartData: cart = {
  //         ...this.productData,
  //         productId: this.productData.id,
  //         userId,
  //         couponDisount: this.couponDisount,
  //         variation: selectedVariation
  //       }
  //       delete cartData.id;

  //       const existingCartItem = this.product.cartData.getValue().find((item: cart) => item.productId === this.productData.id && item.variation?.size === this.selectedSize);

  //       if (existingCartItem) {
  //         cartData.quantity += existingCartItem.quantity; // Increase the quantity
  //         this.product.updateCart(cartData).subscribe((res:any) => {
  //           if (res) {
  //             this.product.getCartList(userId);
  //             this.alert.addedCartAlert();
  //             this.product.currentCart().subscribe((response: any) => {
  //               this.currentCartResponse = response;
  //               console.log("current cart response =>", this.currentCartResponse);
  //             })
  //           }
  //         });
  //       } else {
  //         this.product.addToCart(cartData).subscribe((res) => {
  //           if (res) {
  //             this.product.getCartList(userId);
  //             this.alert.addedCartAlert();
  //             this.product.currentCart().subscribe((response: any) => {
  //               this.currentCartResponse = response;
  //               console.log("current cart response =>", this.currentCartResponse);
  //             })
  //           }
  //         });
  //       }
  //     }
  //   }
  // }

addToCart(){
  this.productData.quantity=this.productQuantity;
  let user = localStorage.getItem('userid');
        let userId= user && JSON.parse(user);
  if(this.selectedSize){
    this.productData.quantity=this.productQuantity;
    console.log("product data.quantity",this.productData.quantity)

    // const selectedVariation = this.productData.variations.find(variation => variation.size === this.selectedSize);
    const selectedVariation: variation | undefined = this.productData.variations.find((variation: variation) => variation.size === this.selectedSize);
    console.log("selected variation",selectedVariation)
    this.product.currentCart().subscribe((respone:any)=>{
      this.currentCartResponse=respone
      console.log("current cart response=>",this.currentCartResponse)
    })
console.log("productData again=>",this.productData)
    if (!selectedVariation) {
      return;
    }
console.log("product id again=>",this.productData.id)
    let productInCart = false;
    this.product.currentCart().subscribe((respone:any)=>{
      this.currentCartResponse=respone;
      const productid=this.currentCartResponse.some((product:any)=> product.productId===this.productData.id)
      if(productid){

        const variations = this.currentCartResponse.some((varient: any) => varient.variation.size === selectedVariation.size);
        if(variations){
          this.cartId=this.currentCartResponse[0].id;
          this.currentCartResponse[0].variation.quantity=this.currentCartResponse[0].variation.quantity+this.productData.quantity;
          console.log("cartId=>",this.cartId)
          // this.currentCartResponse.variation.quantity = this.currentCartResponse.variation.quantity+this.productData.quantity;
          // console.log("current cart response quantity=>",this.currentCartResponse.quantity),
          // console.log("product input quantity=>",this.currentCartResponse.variation.quantity)
          this.quantityVariation=this.currentCartResponse[0].variation.quantity
          console.log("current cart response once again=>",this.currentCartResponse[0].variation.quantity);
          console.log("current cart response once again=>",this.currentCartResponse[0].variation.size);
          console.log("current cart response once again=>",this.currentCartResponse[0].variation.price);
          console.log("size exists in cart");
          console.log("product data quantity=>",this.productData.quantity)
          const cartUpdateData={
            variation:{
              quantity:this.currentCartResponse[0].variation.quantity,
              size:this.currentCartResponse[0].variation.size,
              price:this.currentCartResponse[0].variation.price,

            }
// variation:this.currentCartResponse[0].variation.quantity
          }
          this.apiService.patchRequest('cart/'+this.cartId ,cartUpdateData).subscribe((incCartRes:any)=>{
            console.log("incCartRes",incCartRes)
          })

        }
        else{
          let user = localStorage.getItem('userid');
            let userId= user && JSON.parse(user);
            console.log('userId786',userId);
            let cartData:cart={
              ...this.productData,
              productId:this.productData.id,
              // color: this.productData.variations[0].colors[0],
              userId,
              couponDisount:this.couponDisount,
              variation: selectedVariation
            }
            delete cartData.id;
            console.log('cart Data',cartData);

            this.product.addToCart(cartData).subscribe((res)=>{
              if(res){
                // if(productInCart){
        //   this.productData.quantity += 1;
        // }
                this.product.getCartList(userId);
                // this.removeCart=true;
                this.alert.addedCartAlert();
                // alert('data added successfully')
                this.product.currentCart().subscribe((respone:any)=>{
                  this.currentCartResponse=respone
                  console.log("current cart response=>",this.currentCartResponse)
                })
              }
            })
        }

        // if(!variations){
        //   console.log("varient not exists")
        // }
        console.log("product exists")
      }
      else{
        let user = localStorage.getItem('userid');
          let userId= user && JSON.parse(user);
          console.log('userId786',userId);
          let cartData:cart={
            ...this.productData,
            productId:this.productData.id,
            // color: this.productData.variations[0].colors[0],
            userId,
            couponDisount:this.couponDisount,
            variation: selectedVariation
          }
          delete cartData.id;
          console.log('cart Data',cartData);

          this.product.addToCart(cartData).subscribe((res)=>{
            if(res){
              // if(productInCart){
      //   this.productData.quantity += 1;
      // }
              this.product.getCartList(userId);
              // this.removeCart=true;
              this.alert.addedCartAlert();
              // alert('data added successfully')
              this.product.currentCart().subscribe((respone:any)=>{
                this.currentCartResponse=respone
                console.log("current cart response=>",this.currentCartResponse)
              })
            }
          })
      }
      // if(!productid){
      //   console.log("product not exists")
      // }

      console.log("selected variations again=>",selectedVariation)
      console.log("current cart  response again=>",this.currentCartResponse)
    })
//     if (this.currentCartResponse) {
//       this.alert.addedCartAlert();
//       const cartVariations = this.currentCartResponse.variations;
// //       for (const cartVariation of cartVariations) {
// //         if (this.currentCartResponse?.variation.size === selectedVariation.size)
// //          {
// //           this.currentCartResponse.quantity = this.currentCartResponse.quantity+this.productQuantity;
// //           console.log("product quantity increased=>",this.cartData.quantity)
// //           // cartVariation.quantity += this.productData.quantity;
// // console.log("currentCartResponse.quantity",this.currentCartResponse.quantity)
// //           console.log("cartvariation.quantity=>",cartVariation.quantity)
// //           productInCart = true;
// //           break;
// //         }



// //       }


//     }
    // if (productInCart) {
    //   this.cartData.quantity += this.productQuantity;
    //   this.product.addToCart(this.productData).subscribe((res:any) => {
    //     if (res) {
    //       this.product.getCartList(this.cartData.userId);
    //       // this.removeCart=true;
    //       this.alert.addedCartAlert();
    //       // alert('data added successfully')
    //       this.product.currentCart().subscribe((response: any) => {
    //         this.currentCartResponse = response;
    //         console.log("current cart response =>", this.currentCartResponse);
    //         console.log("cart quantity data=>",this.cartData.quantity)
    //       });
    //     }
    //   });
    // }

    if(!localStorage.getItem('userid')){
      this.product.localAddToCart(this.productData);
      // this.removeCart=true
    }
    // if(productInCart){
    //   this.productData.quantity += 1;
    // }

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
selectSize(variation: variation) {
  this.selectedSize = variation.size;
  this.currentPrice = variation.price;
  console.log("current price",this.currentPrice)

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
