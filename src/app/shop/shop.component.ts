import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { productsQuery } from '../state/products/products.query';
import { productsStore } from '../state/products/products.store';
import { filter, switchMap, take } from 'rxjs';

import { of } from 'rxjs';

import { ProductsService } from '../services/products.service';
import { category } from '../data-type';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  loading=false;
  products:any=[];
  // productsApi:any
  productData:any;
  productsApi: any[] = [];
  sub:any;
  categories:category[]|undefined;
  categoryName: string = '';
  categor:any;
  filtered:any[]= [];
  productArray:any=[] ;
  tempArray:any=[];
  newArray:any=[];
  arrays:any[]=[];
  constructor(private apiService:ApiService, private route:ActivatedRoute ,private router:Router, private query:productsQuery, private productsStore:productsStore,private productService:ProductsService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = +params['id'];
     console.log('id=>', id);

     this.getWishlistProductData(id);
     this.getProduct();


    //  this.getProductData(id)
      // this.getBlogDetails(id);
      // this.getCategory(id)// (+) converts string 'id' to a number


    });
    this.getProductsData()
    // this.productService.getProductsData();
    this.getCategories();
  }
  // filteredData(value:string){

  // }

  getProductsData(){

    this.apiService.getrequest('products').subscribe((res:any)=>
    {

      this.productsApi=res;
      this.arrays=this.productsApi;
this.productArray=this.productsApi
      console.log('Products Data res',this.productsApi)
      console.log("category name=>",)

    })

  }
onChange(event:any){
  // console.log("array=>",this.arrays)
  if(event.target.checked){
    this.tempArray=this.arrays.filter((e:any)=>e.catId==event.target.value)
    this.productArray=[];
    this.newArray.push(this.tempArray);
    for(let i=0;i<this.newArray.length;i++){
var firstArray=this.newArray[i];
for(let i=0;i<firstArray.length;i++){
  var obj=firstArray[i];
  this.productArray.push(obj)
  console.log(this.productArray)
}
console.log(obj)
    }
    // console.log("new array=>",this.newArray)
    // console.log("event target value=>",event.target.value);

    // console.log("value checked", this.tempArray)
  }
  else{
    this.tempArray=this.productArray.filter((e:any)=>e.catId != event.target.value);
    this.newArray=[];
    this.productArray=[];
    this.newArray.push(this.tempArray);
    for(let i=0;i<this.newArray.length;i++){
      var firstArray=this.newArray[i];
      for(let i=0;i<firstArray.length;i++){
        var obj=firstArray[i];
        this.productArray.push(obj)
        console.log(this.productArray)
      }
      console.log(obj)
          }

  }

}
  getCategories(){
    this.apiService.getrequest('categories').subscribe((categoriesRes:any)=>{
this.categories=categoriesRes;
console.log("categories Response=>",this.categories)
    })
  }
getProduct(){
  this.productArray=this.productsApi;
  console.log("product data=>",this.productArray)
}

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          this.productArray = this.arrays.sort((low, high) => low.price - high.price);
          console.log("price low=>",this.productsApi)
          break;
        }

      case "High":
        {
          this.productArray = this.arrays.sort((low, high) => high.price - low.price);
          console.log("price high=>",this.productsApi)
          break;

        }
        case "latest": {

          this.productArray = this.arrays.sort((low, high) => high.id - low.id);
          break;
        }


      // case "Name":
      //   {
      //     this.productsApi = this.productsApi.sort(function (low, high) {
      //       if (low.name < high.name) {
      //         return -1;
      //       }
      //       else if (low.name > high.name) {
      //         return 1;
      //       }
      //       else {
      //         return 0;
      //       }
      //     })
      //     break;
      //   }

      default: {
        this.productArray = this.arrays.sort((low, high) => low.price - high.price);
        break;
      }

    }
    return this.productArray;

  }
  gotoSingleProduct(id:any){
this.router.navigate(['/view-product',id])
  }
  getWishlistProductData(id:any){
    this.apiService.getrequest('products/'+id).subscribe((res:any)=>{
      this.productData=res;
      console.log("Product Data=>",this.productData)
      console.log("res=>",res)
    })
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
