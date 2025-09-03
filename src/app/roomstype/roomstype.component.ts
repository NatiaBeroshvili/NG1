import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { RoomTypes } from '../models/GetroomTypes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roomstype',
  imports: [CommonModule,RouterModule],
  templateUrl: './roomstype.component.html',
  styleUrl: './roomstype.component.scss',
  standalone : true
})
export class RoomstypeComponent implements OnInit{

  @Output() typeId: EventEmitter<number> = new EventEmitter<number>();

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
  searchByType(typeId : number,id:number){
    this.typeId.emit(typeId)
    this.active=`active${id}`
  }

active!: string
}

