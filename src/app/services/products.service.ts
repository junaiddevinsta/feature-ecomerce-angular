import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, filter, map, of, switchMap, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { productsQuery } from '../state/products/products.query';
import { productsStore } from '../state/products/products.store';
import { products } from '../state/products/products.model';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<product[] | []>();
  loading=false;
  products:any=[];
  productsApi:any
  private readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private route:Router, private query:productsQuery, private productsStore:productsStore) { }
  // getrequest(url: string) {
  //   return this
  //           .http
  //           .get(`${this.baseUrl}/${url}`).pipe(
  //             catchError(this.errorHandle)
  //           );
  // }
  // errorHandle(error:HttpErrorResponse)
  // {
  //   console.log('Http error=>',error)
  //   return throwError(error.message || 'server Error');
  // }
  // getProducts(): Observable<products[]> {
  //   return this.http.get<any>(`${this.baseUrl}/products`) .pipe(
  //     map((res) => res),
  //   );
  // }

  getrequest(): Observable<products[]> {
      return this.http.get<any>(`${this.baseUrl}/products`).pipe(
        map((res) => res)
      );
    }
    getQueryData() {
      this.query.getIsLoading().subscribe(res => this.loading = res);
      this.query.getIsLoading().subscribe(res => this.products = res);
      this.getrequest().pipe(
        take(1),
        filter(() => !this.query.getLoaded()),
        switchMap(() => {
          this.productsStore.setLoading(true);
          return this.getrequest();
        })
      ).subscribe(
        res => {
          this.productsStore.update(state => ({
            products: res,
            isLoaded: true
          }));
          this.productsStore.setLoading(false);
        },
        err => {
          console.log(err);
          this.productsStore.setLoading(false);
        }
      );
    }
    
//     getProductsData(){
// // this.getProductsData();
// this.query.getIsLoading().subscribe(res => this.loading = res);
// this.query.getIsLoading().subscribe(res => this.products = res);
// console.log("products data=>")
// // this.getProductsData();
// this.query.getLoaded().pipe(
//   take(1),
//   filter(res => !res),
//   switchMap(() => {
//     this.productsStore.setLoading(true);
//     return of(this.getrequest());
//     //  return this.apiService.getrequest();
//     // return this.getrequest();

//   })
// ).subscribe(
//   res => {
//     this.productsStore.update(state => {
//       return {
//         products: res,
//         isLoaded: true,
//       };
//     });
//     this.productsStore.setLoading(false);
//   },
//   err => {
//     console.log(err);
//     this.productsStore.setLoading(false);
//   }
// );
//   }
// getQueryData(){
//   // this.getProductsData();
//   this.query.getIsLoading().subscribe(res => this.loading = res);
//   this.query.getIsLoading().subscribe(res => this.products = res);
//   // this.getProductsData();
//   this.query.getLoaded().pipe(
//     take(1),
//     filter(res => !res),
//     switchMap(() => {
//       this.productsStore.setLoading(true);
//       return of(this.getrequest());
//       //  return this.apiService.getrequest();
//     })
//   ).subscribe(
//     res => {
//       this.productsStore.update(state => {
//         return {
//           products: res,
//           isLoaded: true,
//         };
//       });
//       this.productsStore.setLoading(false);
//     },
//     err => {
//       console.log(err);
//       this.productsStore.setLoading(false);
//     }
//   );
//     }

}
