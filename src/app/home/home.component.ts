import { Component,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import AOS from 'aos';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Rooms } from '../models/rooms';



@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {


   constructor(private http : ApiService){

    
    
    }

showAllHotels: any;
showAllRooms : any



ngOnInit(): void{
    AOS.init()
    this.AllRooms()

   
    }

roomsArr: Rooms [] = [];

AllRooms() {
  this.http.getData("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
.subscribe((resp:any) => {

  this.roomsArr = resp.slice(0,6)
  console.log(this.roomsArr)
}

)}

}

