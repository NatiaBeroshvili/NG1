import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((p) => p.HomeComponent),
  },

  {
    path: 'hotels',
    loadComponent: () =>
      import('./hotels/hotels.component').then((p) => p.HotelsComponent),
  },

  {
    path: 'rooms',
    loadComponent: () =>
      import('./rooms/rooms.component').then((p) => p.RoomsComponent),
  },

  {
    path: 'rooms/:id',
    loadComponent: () =>
      import('./rooms/rooms.component').then((p) => p.RoomsComponent),
  },

  {
    path: 'booking/:id',
    loadComponent: () =>
      import('./booking/booking.component').then((p) => p.BookingComponent),
  },
  {
    path: 'bookedrooms',
    loadComponent: () =>
      import('./bookedrooms/bookedrooms.component').then(
        (p) => p.BookedroomsComponent
      ),
  },

  { path: '**', component: ErrorComponent },
];
