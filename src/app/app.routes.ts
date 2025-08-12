import { Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BookedroomsComponent } from './bookedrooms/bookedrooms.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
     {
    path:"",
    redirectTo: "home",
    pathMatch: 'full'
    },
    {
      path:'home',
      component:HomeComponent
    },

    { path:'hotels', 
      component: HotelsComponent
    },

    {path:'rooms',
    component:RoomsComponent},

    {path:'bookedrooms',
    component:BookedroomsComponent},
    
    
    {path: '**',
        component: ErrorComponent}
    
];
