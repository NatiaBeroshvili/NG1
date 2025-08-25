import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(url : string){
    return this.http.get(url).pipe(
      catchError(this.errorHandling)
    )

  }

  private errorHandling(err : HttpErrorResponse){
    return throwError(()=> ("something went wrong,try later"))
  }
}
