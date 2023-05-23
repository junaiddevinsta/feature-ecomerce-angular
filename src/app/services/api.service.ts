import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseUrl="http://localhost:3000"
  constructor(private http: HttpClient) { }
  postRequest(url: string, data: any) {
    return this
            .http
            .post(`${this.baseUrl}/${url}`,data);
  }
  getrequest(url: string) {
    return this
            .http
            .get(`${this.baseUrl}/${url}`).pipe(
              catchError(this.errorHandle)
            );
  }
  errorHandle(error:HttpErrorResponse)
  {
    console.log('Http error=>',error)
    return throwError(error.message || 'server Error');
  }

}
