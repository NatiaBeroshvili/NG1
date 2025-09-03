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

  

  constructor(private router: ActivatedRoute, private api: ApiService) {
    this.router.params.subscribe((params) => {
      this.id = params['id'];
    });
  }


  
priceRange: number = 500;
roomType: string = '';
checkIn = new Date();
checkOut= new Date();
guests: number = 1;



originalRooms: Rooms[] = [];


  ngOnInit() {
    if (this.id) {
      this.api
        .roomById(
          `https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${this.id}`
        )
        .subscribe((resp: any) => {
          this.roomsArr = resp.rooms;
          this.originalRooms=resp.rooms
          console.log(this.roomsArr);
        });
    } else {
      this.api
        .getData('https://hotelbooking.stepprojects.ge/api/Rooms/GetAll')
        .subscribe((resp: any) => {
          this.roomsArr = resp;
             this.originalRooms=resp.rooms
          console.log(this.roomsArr);
        });
    }
  }

applyFilters() {
if(this.checkIn < this.checkOut){
  
  this.api.filterRoom("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered",{
  priceFrom: 0,
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
  
  alert("not correct")
}
}

resetFilters() {
  this.priceRange = 500;
  this.roomType = '';
  this.checkIn = new Date();
  this.checkOut = new Date();
  this.guests = 1;


   this.api
        .getData('https://hotelbooking.stepprojects.ge/api/Rooms/GetAll')
        .subscribe((resp: any) => {
          this.roomsArr = resp;
             this.originalRooms=resp.rooms
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
 

