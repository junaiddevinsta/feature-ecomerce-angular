import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl()
  })
  searchData:any=[];
  sear:any;
sub:any;
searchedData:any;
totalItems: any;
  constructor(private route:Router, private router:ActivatedRoute, private apiService:ApiService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {

      // this.sear= params['search']
      this.searchForm.patchValue({
        search: params['search']
      });
      this.getSearchResult(this.searchForm.value.search);
  });
  }

  searchResult(value:any){
    console.log("value",value)
    this.route.navigate(['/search/' + value])
  }
  getSearchResult(searched: any) {
    this.apiService.getrequest('products/search' + searched).subscribe(
      (res: any) => {

          console.log('res =>', res);
          this.searchedData = res;
          console.log("search Value=>",this.searchedData)
          this.totalItems = this.searchedData.length;
          // return res.filter(item => item.property.toLowerCase().includes(query.toLowerCase()));

        },(error) => {
          console.log('error =>', error);
        }

    )
  }

}
