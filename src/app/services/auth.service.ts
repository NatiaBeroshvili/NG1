import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
   }

   isAuth = signal(false);

   logIn(){
      this.isAuth.set(true)
   }

   logOut(){
 this.isAuth.set(false)
   }
}
