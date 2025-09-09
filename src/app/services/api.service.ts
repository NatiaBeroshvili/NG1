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


  getAllRooms(url : string){
    return this.http.get(url).pipe(
      catchError(this.errorHandling)
    )
  }

roomById(url :string){
  return this.http.get(url).pipe(
    catchError(this.errorHandling)
  )
}
  
getroomTypes(url:string){
  return this.http.get(url).pipe(
    catchError(this.errorHandling)
  )
}

 filterRoom(url: string, obj : any){
     return this.http.post(url, obj).pipe(
    catchError(this.errorHandling)
  )
 }

creatBooking(url: string, obj: any){
  return this.http.post(url, obj, { responseType: 'text' }).pipe(
    catchError(this.errorHandling)
  );
}

getBookings(url:string){
  return this.http.get(url).pipe(
    catchError(this.errorHandling)
  )
}


  private errorHandling(_err : HttpErrorResponse){
    return throwError(()=> ("something went wrong,try later"))
  }
}
