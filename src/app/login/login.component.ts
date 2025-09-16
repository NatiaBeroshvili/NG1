import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor(private http :ApiService, private router :Router, private auth: AuthService){

}

password! : string;
phonenumber! : string;


  login(){

    this.http.postData("https://rentcar.stepprojects.ge/api/Users/login",{
    
        phoneNumber :this.phonenumber,
        password :this.password
    
      }).subscribe((resp : any) => {
        console.log(resp)
        
      Swal.fire({
      position: "center",
      icon: "success",
      title: "you was loged in successfully!",
      showConfirmButton: false,
      timer: 1500
    });
    localStorage.setItem("token",resp.token)
    this.auth.logIn()
    this.router.navigateByUrl("/bookedrooms")
      })
  
}
}



