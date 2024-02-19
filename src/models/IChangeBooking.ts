export interface IChangeBooking {
    id: string;
  restaurantId: string;
  date: number;
  time: number;
  numberOfGuests: number;
  customerId: string;
}