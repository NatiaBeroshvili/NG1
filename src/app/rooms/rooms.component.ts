import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { RoomById } from '../models/roomById';
import { RoomstypeComponent } from '../roomstype/roomstype.component';
import { Rooms } from '../models/rooms';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule, FormsModule, RoomstypeComponent, RouterModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  standalone: true,
})
export class RoomsComponent implements OnInit {
  room: any;
  id!: string;
  today: any;

  

  constructor(private router: ActivatedRoute, private api: ApiService) {
    this.router.params.subscribe((params) => {
      this.id = params['id'];
    });
  }


  
priceRange: number = 500;
roomType: string = '';
checkIn: string = new Date().toISOString().split('T')[0];
checkOut= new Date();

guests: number = 1;






  ngOnInit() {
    if (this.id) {
      this.api
        .roomById(
          `https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${this.id}`
        )
        .subscribe((resp: any) => {
          this.roomsArr = resp.rooms;
         
          console.log(this.roomsArr);
        });
    } else {
      this.api
        .getData('https://hotelbooking.stepprojects.ge/api/Rooms/GetAll')
        .subscribe((resp: any) => {
          this.roomsArr = resp;
         
          console.log(this.roomsArr);
        });
    }
  }

filterByRange(){
  this.api.filterRoom("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered",{
  priceFrom: 0,
  priceTo: this.priceRange,

  } ).subscribe((resp :any) =>
    {console.log(resp)
    this.roomsArr=resp

    })
}

applyFilters() {
if (new Date(this.checkIn) < new Date(this.checkOut), this.priceRange) {
  
  this.api.filterRoom("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered",{
  roomTypeId: this.roomType,
  priceFrom: 50,
  priceTo: this.priceRange,
  maximumGuests: this.guests,
  checkIn:this.checkIn,
  checkOut: this.checkOut


  } ).subscribe((resp :any) =>
    {console.log(resp)
    this.roomsArr=resp

    })

}
else{
  
  alert("La date de départ ne peut pas être avant la date d'arrivée.")
   return;
}
}

resetFilters() {
  this.priceRange = 500;
  this.roomType = '';
  this.checkIn = new Date().toISOString().split('T')[0];
  this.checkOut= new Date();
  this.guests = 1;


   this.api
        .getData('https://hotelbooking.stepprojects.ge/api/Rooms/GetAll')
        .subscribe((resp: any) => {
          this.roomsArr = resp;
            
          console.log(this.roomsArr);
        });
}


  roomsArr: Rooms[] = [];

  roomTypeFromChild(id: number) {
    console.log('from child ' + id);

    if (id === -1) {
      this.api
        .getData('https://hotelbooking.stepprojects.ge/api/Rooms/GetAll')
        .subscribe((resp: any) => {
          this.roomsArr = resp;
          console.log(this.roomsArr);
        });
    } else {
      this.api
        .filterRoom(
          'https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered',
          {
            roomTypeId: id,
          }
        )
        .subscribe((resp: any) => {
          this.roomsArr = resp;

          console.log(this.roomsArr);
        });
    }
  }
  
}
 

