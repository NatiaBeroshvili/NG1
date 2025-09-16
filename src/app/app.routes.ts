import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './guards/auth.guard';

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
        (p) => p.BookedRoomsComponent
      ),
      canActivate : [authGuard]
  },

    {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((p) => p.RegisterComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((p) => p.LoginComponent),
  },


   {
    path: 'signal',
    loadComponent: () =>
      import('./signal/signal.component').then((p) => p.SignalComponent),
  },
  { path: '**', component: ErrorComponent },
];
