import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private http: ApiService , private router: Router){


  }

password! : string;
phonenumber! : string;

register(){
  this.http.postData("https://rentcar.stepprojects.ge/api/Users/register",{

    phoneNumber :this.phonenumber,
    password :this.password

  }).subscribe((resp : any) => {
    console.log(resp)
    
  Swal.fire({
  position: "center",
  icon: "success",
  title: "your registration was successful!",
  showConfirmButton: false,
  timer: 1500
});this.router.navigateByUrl("/login")
  })
  // localStorage.setItem("token","token")
}






}
