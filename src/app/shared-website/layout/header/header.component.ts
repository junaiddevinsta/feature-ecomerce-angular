import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  display = false;
  toggle(){
    this.display=!this.display
  }
  constructor(private authService:AuthService) { }

  ngOnInit(): void {

  }

  isLogged() {
    return this.authService.isLogged()
    // localStorage.clear();


  }
}
