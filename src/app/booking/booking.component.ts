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
  imports: [CommonModule,FormsModule],
  standalone: true
})
export class BookingComponent {
  booking = {
  checkIn: new Date().toISOString().substring(0, 10),
  checkOut: '',
  name: '',
  phone: ''
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
  }

  bookNow(): void {
  if (!this.booking.name || !this.booking.phone) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  console.log('Réservation confirmée :', this.booking);
}

}