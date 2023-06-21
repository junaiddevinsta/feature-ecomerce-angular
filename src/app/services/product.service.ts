import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product, wishlist } from '../data-type';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  wishlistData = new EventEmitter<product[] | []>();
  private readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    console.log('cart data')
    }


    // else{
      // if(localCart){
      //   console.log('already added')
      // }
      else{
        cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      }

    // }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  localAddToWishlist(data: product) {
    let wishlistData = [];
    let localWishlist = localStorage.getItem('localCart');
    if (!localWishlist) {
      localStorage.setItem('localWishlist', JSON.stringify([data]));
    console.log('localWishlist data')
    }


    // else{
      // if(localCart){
      //   console.log('already added')
      // }
      else{
        wishlistData = JSON.parse(localWishlist);
        wishlistData.push(data);
      localStorage.setItem('localWishlist', JSON.stringify(wishlistData));
      }

    // }
  }
  addToCart(cartData: cart) {
    return this.http.post(`${this.baseUrl}/cart`, cartData);
  }
  addToCartPatch(cartData: cart) {
    return this.http.patch(`${this.baseUrl}/cart`, cartData);
  }

  getCartList(userId: any) {
    return this.http
      .get<product[]>(`${this.baseUrl}/cart?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.log('cart list data',result.body)
        if (result && result.body) {
          this.cartData.emit(result.body);
          console.log('result body',result.body)
        }
      });
  }
  removeToCart(cartId:any){
    return this.http.delete(`${this.baseUrl}/cart/` + cartId);
  }
  currentCart() {
    let user = localStorage.getItem('userid');
    let userData = user && JSON.parse(user);
    // 'http://localhost:3000/cart?userId='
    return this.http.get<cart[]>(`${this.baseUrl}/cart?userId=` + userData);
  }
  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.baseUrl}/cart/` + cartId,{observe:'response'}).subscribe((result) => {
      this.cartData.emit([]);
    })
  }
  addToWishlist(wishlistData: wishlist) {
    return this.http.post(`${this.baseUrl}/wishlist`, wishlistData);
  }
  removeItemFromWishlist(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  getWishlistList(userId: any) {
    return this.http
    // 'http://localhost:3000/wishlist?userId='
      .get<product[]>(`${this.baseUrl}/wishlist?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.log('wishlist list data',result.body)
        if (result && result.body) {
          this.wishlistData.emit(result.body);
          console.log('result wishlist body',result.body)
        }
      });
  }
  removeToWishlist(wishlistId:any){
    return this.http.delete(`${this.baseUrl}/wishlist/` + wishlistId);
  }
  currentWishlist() {
    let user = localStorage.getItem('userid');
    let userData = user && JSON.parse(user);
    return this.http.get<wishlist[]>('http://localhost:3000/wishlist?userId=' + userData);
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(
      `${this.baseUrl}/products?q=${query}`
    );
    // http://localhost:3000/products?q=
  }
}
