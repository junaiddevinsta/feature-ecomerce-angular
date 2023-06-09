import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult:product[] |undefined;
  productData:any;
  searchForm = new FormGroup({
    search: new FormControl()
  })
  // value:any;
  searchData:any=[];
  sear:any;
sub:any;
searchedData:any;
totalItems: any;
searchResultData:any
  constructor(private route:Router, private router:ActivatedRoute, private apiService:ApiService, private product:ProductService) { }

  ngOnInit(): void {

this.search();
  }
search(){
  this.router.queryParams.subscribe((params)=>{
    let query = this.router.snapshot.paramMap.get('query');
  console.log("searched query=>",query)
  query && this.product.searchProduct(query).subscribe((result)=>{
    this.searchResult=result;

    console.log("searchResult Data=>",this.searchResult)

  })
  })

}

  submitSearch(val:string){
    this.search();
    console.log(val)
  this.route.navigate([`search/${val}`]);


  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
       console.log("searched value=>",result);
       this.searchResult=result;
       console.log("search result name=>",this.searchResult);
      //  this.submitSearch(this.value)

      })
    }
  }
  gotoSingleProduct(id:any){
    this.route.navigate(['/view-product',id])
      }

}
