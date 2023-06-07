import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly baseUrl = environment.baseUrl;
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }
  orderNow(data: order) {
    return this.http.post(`${this.baseUrl}/orders`, data);
  }

}
