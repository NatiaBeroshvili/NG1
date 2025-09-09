import { CommonModule } from '@angular/common';
import { Component,OnDestroy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-bookedrooms',
  imports: [CommonModule,FormsModule],
  templateUrl: './bookedrooms.component.html',
  styleUrl: './bookedrooms.component.scss',
})


export class BookedRoomsComponent implements OnInit, OnDestroy  {
  bookingData: any;

  ngOnInit() {
    const storedData = localStorage.getItem('latestBooking');
    if (storedData) {
      this.bookingData = JSON.parse(storedData);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('latestBooking');
  }

}






