import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly baseUrl = environment.baseUrl;
  private httpOptions = {};
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
    return !!localStorage.getItem('token');
  }
}
