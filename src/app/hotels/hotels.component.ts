import { Component} from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Hotels } from '../models/hotels';
import { RouterLink, RouterModule } from '@angular/router';




@Component({
  selector: 'app-hotels',
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})



export class HotelsComponent {

constructor(private http : ApiService){

}

ngOnInit(){
this.http.getData("https://hotelbooking.stepprojects.ge/api/Hotels/GetAll")
.subscribe((resp:any) => {

  this.hotelsArr = resp
  console.log(this.hotelsArr)
}


)
}



hotelsArr: Hotels[] = [];


}


  
  
  









