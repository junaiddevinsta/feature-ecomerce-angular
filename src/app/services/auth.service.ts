import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private httpOptions = {};
  private authToken: string = '';
  constructor(private http:HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { email, password };
    return this.http.post(url, body);
  }

  checkExistingUser(email: string, username: string): Observable<any> {
    const url = `${this.apiUrl}/signupUsersList`;
    return this.http.get(url, { params: { email, username } });
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

}
