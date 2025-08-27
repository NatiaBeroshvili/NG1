import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { RoomTypes } from '../models/GetroomTypes';

@Component({
  selector: 'app-roomstype',
  imports: [],
  templateUrl: './roomstype.component.html',
  styleUrl: './roomstype.component.scss'
})
export class RoomstypeComponent implements OnInit{

  
  constructor(private api : ApiService) {

  }

  ngOnInit() {
    this.api.getroomTypes("https://hotelbooking.stepprojects.ge/api/Rooms/GetRoomTypes")
      .subscribe((resp :any) =>{
        this.roomsTypeArr = resp
        console.log(this.roomsTypeArr)
      });
  }

  roomsTypeArr: RoomTypes[] = [];
}

