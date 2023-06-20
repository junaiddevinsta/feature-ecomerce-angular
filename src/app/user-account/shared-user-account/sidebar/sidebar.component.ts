import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private userAccount:UserAccountService, private authService:AuthService,private route:Router,private product:ProductService) { }
  showComponent(componentName: string) {
    this.userAccount.showComponent(componentName);
  }
  @Input() page = '';
  ngOnInit(): void {
    console.log('page =>',this.page);
    console.log('page =>',this.page);
  }
  buttonClick(){
    this.userAccount.onButtonClick()
  }
  btnValue = 'profile-info';


selectBtn(val: string){
  this.btnValue  = val;
  }
  isLogged() {

    // localStorage.clear();
    // this.product.cartData.emit([]);
    return this.authService.isLogged()


  }
 logout(){
    localStorage.clear();
    this.product.cartData.emit([]);
    this.product.wishlistData.emit([])
    this.route.navigate(['/login'])
  }

}
