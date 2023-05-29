import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
sub:any;
productData:any
  constructor(private route:ActivatedRoute,private apiService:ApiService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = +params['id'];
     console.log('id=>', id);
     this.getProductData(id)
      // this.getBlogDetails(id);
      // this.getCategory(id)// (+) converts string 'id' to a number


      // In a real app: dispatch action to load the details here.
    });
  }
  getProductData(id:any){
    this.apiService.getrequest('products/'+id).subscribe((res:any)=>{
      this.productData=res;
      console.log("Blog Data=>",this.productData)
      console.log("res=>",res)
    })
  }

}
