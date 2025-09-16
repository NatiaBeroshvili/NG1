import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2'

export const authGuard: CanActivateFn = (route, state) => {

//  return true;
let router = inject(Router)

let token = localStorage.getItem("token")


if(token){
  return true

}else{
  router.navigateByUrl("/register")
  Swal.fire("Please register to continue!");

  return false
}

};
