import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private auth : AuthService){

    this.isAutorised = computed(() =>this.auth.isAuth() )
  }

  isAutorised! : any

  ngOnInit(){

    if(localStorage.getItem("token")){
       
      this.isAuth=true
    }
  
  }
   
  isAuth =false

 active="active"
 
  showBurger =false
showHide() {this.showBurger==false? this.showBurger=true :this.showBurger=false;
}

logout(){
  localStorage.removeItem("token")
  this.auth.logOut()
}

}