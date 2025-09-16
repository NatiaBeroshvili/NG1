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

// filterByRange(){
//   this.api.filterRoom("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered",{
//   priceFrom: 0,
//   priceTo: this.priceRange,

//   } ).subscribe((resp :any) =>
//     {console.log(resp)
//     this.roomsArr=resp

//     })
// }

errorMessage: string = '';


applyFilters() {

  const checkInDate = new Date(this.checkIn);
  const checkOutDate = new Date(this.checkOut);
  const today = new Date();
  roomTypeId: this.roomType;


   // Validation des dates
  if (!this.checkIn || !this.checkOut || checkOutDate <= checkInDate || checkOutDate < today ) {
    this.errorMessage = '❌ Please enter valid dates. Check-out must be after check-in and not in the past!';
    return;
  }

  // Validation du prix
  if (this.priceRange < 89) {
    this.errorMessage = '⚠️ Sorry, no rooms are available below €89. Please increase your price range!';
    return;
  }
if (!this.roomType) {
  this.errorMessage = '⚠️ Please select a room type before applying filters!';
  return;
}


  // Si tout est bon, on efface le message et on lance la requête
  this.errorMessage = '';

  
  this.api.filterRoom("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered",{
  roomTypeId: this.roomType,
  priceFrom: 50,
  priceTo: this.priceRange,
  maximumGuests: this.guests,
  checkIn:this.checkIn,
  checkOut: this.checkOut,


  } ).subscribe((resp :any) =>
    {console.log(resp)
    this.roomsArr=resp

    })

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
 

