import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookedrooms',
  imports: [CommonModule, FormsModule],
  templateUrl: './bookedrooms.component.html',
  styleUrl: './bookedrooms.component.scss',
})
export class BookedRoomsComponent implements OnInit {

  name = '';
  room = '';
  total = 0;
  nights = 0;
  guests = 1;

  constructor(private http: ApiService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
      this.room = params['room'];
      this.total = +params['total'];
      this.nights = +params['nights'];
      this.guests = +params['guests'];
    });
  }

 
  bookingData: any;
  noBookingText = false;

  ngOnInit() {
    const storedData = localStorage.getItem('latestBooking');
    if (storedData) {
      this.bookingData = JSON.parse(storedData);
    } else {
      this.noBookingText = true;
    }
  }

  // ngOnDestroy(): void {
  //   localStorage.removeItem('latestBooking');
  // }  // ეს არ ვიცი რამდენად გინდა ლოგაუთზე ჯობია მგონი გააკეთო ლოკალსტორიჯის გასუფთავება და თუ მომხმარებელმა წაშალა მაშინ

  confirmationMessage: string = '';

  deleteBooking() {
    this.http
      .deleteBooking(
        `https://hotelbooking.stepprojects.ge/api/Booking/${this.bookingData.id}`
      )
      .subscribe((resp) => {
       this.confirmationMessage = 'Your booking has been successfully deleted!';
        localStorage.removeItem('latestBooking');
        this.noBookingText = true;
        this.bookingData = null;
      });
  }
}
