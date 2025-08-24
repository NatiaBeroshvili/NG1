import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import AOS from 'aos';



@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
showAllHotels: any;

ngOnInit(): void{
    AOS.init()
    }

  }




