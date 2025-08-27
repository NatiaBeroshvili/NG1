import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { RoomById } from '../models/roomById';
import { RoomstypeComponent } from "../roomstype/roomstype.component";
import { Rooms } from '../models/rooms';


@Component({
  selector: 'app-rooms',
  imports: [CommonModule, FormsModule, RoomstypeComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})

export class RoomsComponent implements OnInit{
room: any;
id!: string;

  constructor(private router: ActivatedRoute, 
               private api: ApiService) {

                this.router.params.subscribe(params => {
                 this.id = params['id'];
              });
}

ngOnInit() {
  if (this.id) {
    this.api.roomById(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${this.id}`)
      .subscribe((resp: any) => {
        this.roomsArr = resp.rooms;
        console.log(this.roomsArr);
      });
  } else {
    this.api.getData("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
      .subscribe((resp: any) => {
        this.roomsArr = resp;
        console.log(this.roomsArr);
      });
  }
}



roomsArr: Rooms [] = [];


}




