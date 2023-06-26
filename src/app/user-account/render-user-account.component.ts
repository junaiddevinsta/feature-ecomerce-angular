import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../services/user-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-render-user-account',
  templateUrl: './render-user-account.component.html',
  styleUrls: ['./render-user-account.component.scss']
})
export class RenderUserAccountComponent implements OnInit {
  // currentUrl:any;
  currentUrl: string = '';
  isButtonClicked = false;
  constructor(private userAccount:UserAccountService,private router: Router) {

   }
   isActiveComponent(componentName: string) {
    // return this.userAccount.activeComponentValue === componentName;
    const currentUrl = this.router.url;
  return currentUrl.includes(componentName);
   }
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl)

  }
  onButtonClick() {
    this.isButtonClicked = true;
  }
}
