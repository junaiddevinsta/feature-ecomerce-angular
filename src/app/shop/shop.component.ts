import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { productsQuery } from '../state/products.query';
import { productsStore } from '../state/products/products.store';
import { filter, switchMap, take } from 'rxjs';
import { state } from '@angular/animations';
import { of } from 'rxjs';
import { products } from '../state/products/products.model';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  loading=false;
  products:any=[];
  productsApi:any
  constructor(private apiService:ApiService, private route:Router, private productsQuery:productsQuery, private productsStore:productsStore) { }

  ngOnInit(): void {

  }
  getProductsData(){
    this.apiService.getrequest('products').subscribe((res:any)=>
    {

      this.productsApi=res;
      console.log('Category Data res',this.productsApi)
    })

  }
  getQueryData(){
// this.getProductsData();
this.productsQuery.getIsLoading().subscribe(res => this.loading = res);
this.productsQuery.getIsLoading().subscribe(res => this.products = res);

this.productsQuery.getLoaded().pipe(
  take(1),
  filter(res => !res),
  switchMap(() => {
    this.productsStore.setLoading(true);
    return of(this.getProductsData()); // Assuming this returns an Observable
  })
).subscribe(
  res => {
    this.productsStore.update(state => {
      return {
        ...state,
        product: res as products[] | undefined
      }
    });
    this.productsStore.setLoading(false);
  },
  err => {
    console.log(err);
    this.productsStore.setLoading(false);
  }
);
  }
}
