import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { order } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  orderNow(data: order) {
    return this.http.post(`${this.baseUrl}/orders`, data);
  }
}
