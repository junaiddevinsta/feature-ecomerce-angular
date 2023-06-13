import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
about:any;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getAboutData();
  }
  getAboutData(){
    this.apiService.getrequest('about').subscribe((res)=>{
      this.about=res;
      console.log("about Response=>",res)
    })
  }

}
