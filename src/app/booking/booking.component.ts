import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
    checkIn: '',
    checkOut: '',
    name: '',
    customerId: '',
    phone: '',
    totalPrice: 0,
    
  };


  roomId!: number;
  room: Rooms | null = null;
  // router: any;

  


  constructor(private route: ActivatedRoute,
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



  bookNow() {
    if (!this.booking.name || !this.booking.phone) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    this.api
      .creatBooking("https://hotelbooking.stepprojects.ge/api/Booking", {
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
      .subscribe((resp: any) =>  {

        
  localStorage.setItem(
    'latestBooking',
    JSON.stringify({
      id: resp.id, // ეს მოდის სერვერიდან
      total: this.room?.pricePerNight || 0,
      guests: this.booking.customerId || 'client-001',
      roomID: this.roomId,
      customerName: this.booking.name,
      checkInDate: this.booking.checkIn,
      checkOutDate: this.booking.checkOut,
      customerPhone: this.booking.phone,
    })
  );

  this.router.navigate(['/bookedrooms']);
});


        console.log('Réservation confirmée :');
   
  }}