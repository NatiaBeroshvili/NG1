import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  errorMessage: string = '';

  booking = {
    id: 0,
    roomId: 0,
    checkIn: '',
    checkOut: '',
    nights: 0,
    name: '',
    guests: 1,
    customerId: '',
    phone: '',
    totalPrice: 0,
  };

  roomId!: number;
  room: Rooms | null = null;
  // router: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
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
  }

  calculateTotalPrice() {
    if (!this.booking.checkIn || !this.booking.checkOut || !this.room) {
      this.booking.totalPrice = 0;
      this.booking.nights = 0;
      return;
    }

    const checkIn = new Date(this.booking.checkIn);
    const checkOut = new Date(this.booking.checkOut);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const guests = this.booking.guests || 1;

    if (nights <= 0 || guests <= 0) {
      this.booking.totalPrice = 0;
      this.booking.nights = 0;
      return;
    }

    this.booking.nights = nights;
    this.booking.totalPrice = nights * this.room.pricePerNight * guests;
  }

  bookNow() {

  const today = new Date();
  const checkIn = new Date(this.booking.checkIn);
  const checkOut = new Date(this.booking.checkOut);


    if (!this.booking.name || !this.booking.phone || !this.booking.checkIn || !this.booking.checkOut) {
      this.errorMessage = 'All feelds are required!';
      return;
    }

    if (checkOut < today) {
  this.errorMessage = 'Check-out date cannot be earlier than today!';
  return;
}

if (checkOut <= checkIn) {
  this.errorMessage = 'Check-out date must be after check-in date!';
  return;
}

this.errorMessage = '';


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
      })
      .subscribe((resp: any) => {
        localStorage.setItem(
          'latestBooking',
          JSON.stringify({
            id: resp.split(' ')[5], // ეს მოდის სერვერიდან  Booking retrieved successfully. Booking Id 14100
           
            roomImages: this.room?.images.map(img => img.source),
            total: this.booking.totalPrice,
            guests: this.booking.customerId || 'client-001',
            roomID: this.roomId,
            roomName: this.room?.name,
            customerName: this.booking.name,
            checkInDate: this.booking.checkIn,
            checkOutDate: this.booking.checkOut,
            customerPhone: this.booking.phone,
          
           

          })
        );

        this.router.navigate(['/bookedrooms'], {
          queryParams: {
            name: this.booking.name,
            room: this.room?.name,
            total: this.booking.totalPrice,
            nights: this.booking.nights,
            guests: this.booking.guests,
          },
        });
      });

    console.log('reservation is done');
  }
}
