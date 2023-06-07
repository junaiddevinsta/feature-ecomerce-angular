import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../data-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }
  orderList(){
    let user = localStorage.getItem('userid');
    let userData = user && JSON.parse(user);
    return this.http.get<order[]>(`${this.baseUrl}/orders?userId=` + userData);
  }
  cancelOrder(orderId:number){
    return this.http.delete(`${this.baseUrl}/orders/`+orderId)

  }
}
