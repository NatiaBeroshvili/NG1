 export class Rooms{
  id!: number;
  name!: string;
  hotelId!: number;
  pricePerNight!: number;
  available!: boolean;
  maximumGuests!: number;
  roomTypeId! : number;
  images!: Array<{ source: string }>;
}





