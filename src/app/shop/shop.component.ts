import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { productsQuery } from '../state/products/products.query';
import { productsStore } from '../state/products/products.store';
import { filter, switchMap, take } from 'rxjs';

import { of } from 'rxjs';

import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  loading=false;
  products:any=[];
  productsApi:any
  constructor(private apiService:ApiService, private router:Router, private query:productsQuery, private productsStore:productsStore,private productService:ProductsService) { }

  ngOnInit(): void {
    this.getProductsData()
    // this.productService.getProductsData();
  }
  getProductsData(){
    this.apiService.getrequest('products').subscribe((res:any)=>
    {

      this.productsApi=res;
      // console.log('Products Data res',this.productsApi)
    })

  }
  gotoSingleProduct(id:any){
this.router.navigate(['/view-product',id])
  }

//   getQueryData(){
// this.query.getIsLoading().subscribe(res => this.loading = res);
// this.query.getIsLoading().subscribe(res => this.products = res);
// this.getProductsData();
// this.query.getLoaded().pipe(
//   take(1),
//   filter(res => !res),
//   switchMap(() => {
//     this.productsStore.setLoading(true);
//     return of(this.getProductsData());
//     //  return this.apiService.getrequest();
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
}
