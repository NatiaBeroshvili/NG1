import { Component,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import AOS from 'aos';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';



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

roomsArr: {
  id: number;
  name: string;
  hotelId: number;
  pricePerNight: number;
  available: boolean;
  images :[
    {source : string}
  ]
}[] = [];

AllRooms() {
  this.http.getData("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
.subscribe((resp:any) => {

  this.roomsArr = resp
  console.log(this.roomsArr)
}

)}

}


// {id: 1, name: 'Premium Room', hotelId: 1, pricePerNight: 199, available: true, …