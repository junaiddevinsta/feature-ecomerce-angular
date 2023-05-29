import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categoryData:any
  display = false;
  toggle(){
    this.display=!this.display
  }
  constructor(private authService:AuthService,private route:Router) { }

  ngOnInit(): void {
// this.getCategoriesData();
console.log("categories data")
  }

  isLogged() {
    return this.authService.isLogged()
    // localStorage.clear();


  }
  gotoSearch(){
    this.route.navigate(['search']);
  }
//   getCategoriesData(){
//     this.apiService.getrequest('categories').subscribe((res:any)=>
//     {

//       this.categoryData=res;
//       console.log('categories Data res',this.categoryData)
//     })
// }
}
