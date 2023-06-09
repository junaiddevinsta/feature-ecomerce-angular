import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
// import { products } from '../state/products/products.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
private readonly baseUrl = environment.baseUrl;
// url="http://localhost:3000/products"
  constructor(private http: HttpClient) { }
  postRequest(url: string, data: any) {
    return this
            .http
            .post(`${this.baseUrl}/${url}`,data);
  }
  // getrequest(): Observable<products[]> {
  //   return this.http.get<{ data: products[] }>(this.baseUrl).pipe(
  //     map((res) => res.data)
  //   );
  // }
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
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

   search(query: string): Observable<any[]> {
    return this.getData().pipe(
      map(data => {
        // Implement your search logic here
        // For example, filter the data based on a property containing the query
        return data.filter(item => item.property.toLowerCase().includes(query.toLowerCase()));
      })
    );
  }
  putRequest(url:any,data:any){
    return this.http.put(`${this.baseUrl}/${url}`,data);
  }
  patchRequest(url:any,data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH',
    });

    return this.http.patch(`${this.baseUrl}/${url}`, data,{ headers });
  }
  // getProducts(): Observable<any> {
  //   return this.http.get<any>(this.url);
  // }

}
