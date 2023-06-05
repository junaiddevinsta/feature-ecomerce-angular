import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiToken:any
  private readonly baseUrl = environment.baseUrl;
  private authToken: string = '';
  constructor(private http:HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const body = { email, password };
    return this.http.post(url, body).pipe(
      catchError(this.errorHandle)
    );
  }
  errorHandle(error:HttpErrorResponse)
  {
    console.log('Http error=>',error)
    return throwError(error.message || 'server Error');
  }
  // register(email: string,password: string): Observable<any> {
  //   const url = `${this.baseUrl}/register`;
  //   const body = { email,password };
  //   return this.http.post(url, body);
  // }
  checkExistingUser(email: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.get(url, { params: { email } });
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  getAuthToken(): string {
    return this.authToken;
  }


  getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
  }
  isLogged() {
    this.apiToken = this.generateApiToken();
    return localStorage.getItem('apiToken');
  }
  generateApiToken(): string {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 32;
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
}
