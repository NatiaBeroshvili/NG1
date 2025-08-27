 export class Rooms{
  id!: number;
  name!: string;
  hotelId!: number;
  pricePerNight!: number;
  available!: boolean;
  images !:[
    {source : string}
  ]
 }