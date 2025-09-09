import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BookedRoomsComponent } from './bookedrooms/bookedrooms.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,HomeComponent,HotelsComponent,RoomsComponent,BookedRoomsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NG1';
}

