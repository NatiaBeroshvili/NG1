import { Component} from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-hotels',
  imports: [CommonModule],
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

hotelsArr: 
{ 
  id:number;
  name:string
  address: string; 
  city: string;
  featuredImage: string }[] = [];

}


  
  
  









