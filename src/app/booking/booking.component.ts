import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Rooms } from '../models/rooms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class BookingComponent {
  booking = {
    id: 0,
    roomId: 0,
    checkIn: new Date().toISOString().substring(0, 10),
    checkOut: '',
    name: '',
    customerId: '',
    phone: '',
    totalPrice: 0,
  };

  roomId!: number;
  room: Rooms | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];
    });
  }

  ngOnInit() {
    this.api
      .getData(
        `https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${this.roomId}`
      )
      .subscribe((resp: any) => {
        console.log(resp);
        this.room = resp;
      });

    // Remove this block from ngOnInit. Booking should be created in bookNow() when user submits the form.
  }

  //   bookNow(){
  //   if (!this.booking.name || !this.booking.phone) {
  //     alert('Veuillez remplir tous les champs');
  //     return;
  //   }

  //   console.log('Réservation confirmée :', this.booking);
  // }
  bookNow() {
    if (!this.booking.name || !this.booking.phone) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    this.api
      .creatBooking('https://hotelbooking.stepprojects.ge/api/Booking', {
        id: 0,
        roomID: this.roomId,
        checkInDate: this.booking.checkIn,
        checkOutDate: this.booking.checkOut,
        totalPrice: this.room?.pricePerNight || 0,
        isConfirmed: true,
        customerName: this.booking.name,
        customerId: 'client-001', // tu peux générer ou demander cet ID
        customerPhone: this.booking.phone,

        //       {
        //   "id": 0,
        //   "roomID": 0,
        //   "checkInDate": "2025-09-08T15:48:04.685Z",
        //   "checkOutDate": "2025-09-08T15:48:04.685Z",
        //   "totalPrice": 0,
        //   "isConfirmed": true,
        //   "customerName": "string",
        //   "customerId": "string",
        //   "customerPhone": "string"
        // }
      })
      .subscribe((resp: string) => {
        console.log('Réservation confirmée :', resp);
      });
  }
}
