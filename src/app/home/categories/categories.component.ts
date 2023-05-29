import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { filter, of, switchMap, take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { categoryQuery } from 'src/app/state/categories/category.query';
import { categoryStore } from 'src/app/state/categories/category.store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
categoryApiData:any;
loading=false;
category:any=[];

  constructor(private apiService:ApiService,private route:Router, private router:Router,private query:categoryQuery,private categoryStore:categoryStore) { }

  ngOnInit(): void {
    this.getCategoryData()
  }
  getCategoryData(){
    this.apiService.getrequest('categories').subscribe((res:any)=>{
this.categoryApiData=res;
console.log("category Data=>",this.categoryApiData)
    })
  }
// getCategoryQueryData(){
//   this.query.getIsLoading().subscribe(res => this.loading = res);
//   this.query.getIsLoading().subscribe(res => this.category = res);
// this.getCategoryData();
//   this.query.getLoaded().pipe(
//     take(1),
//     filter(res => !res),
//     switchMap(() => {
//       this.categoryStore.setLoading(true);
//       return of(this.getCategoryData());
//       //  return this.apiService.getrequest();
//     })
//   ).subscribe(
//     res => {
//       this.categoryStore.update(state => {
//         return {
//           products: res,
//           isLoaded: true,
//         };
//       });
//       this.categoryStore.setLoading(false);
//     },
//     err => {
//       console.log(err);
//       this.categoryStore.setLoading(false);
//     }
//   );
// }
}
