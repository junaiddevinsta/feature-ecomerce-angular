import { Component, Input, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private userAccount:UserAccountService) { }
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


}
