

import  { useState, useEffect } from "react";
import axios from "axios";
import { IBookingdata } from "../models/IBookingdata";
import { ICustomerData } from "../models/ICustomerData";

export const BookingList = () => {
  const apiUrl = "https://school-restaurant-api.azurewebsites.net";
  const restaurantId = "65cb3f298d602db609b8b96d";

  const [bookings, setBookings] = useState<IBookingdata[]>([]);
  const [customerDetails, setCustomerDetails] = useState<ICustomerData[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
    
        const response = await axios.get<IBookingdata[]>(
          `${apiUrl}/booking/restaurant/${restaurantId}`
        );
        setBookings(response.data);

        const customerDetailsData = await Promise.all(
          response.data.map(async (booking) => {
            const customerResponse = await axios.get<ICustomerData[]>(
              `${apiUrl}/customer/${booking.customerId}`
            );
            return customerResponse.data[0];
          })
        );
        setCustomerDetails(customerDetailsData);
    };

    fetchBookings();
  }, [apiUrl, restaurantId]);


  return (
    <div>
      <h1>Bokningar</h1>
      <hr />
      {bookings.map((booking, index) => (
        <div key={booking.id}>
          <h4>Datum: {booking.date}</h4>
          <p>Tid: {booking.time}</p>
          <p>Antal gäster: {booking.numberOfGuests}</p>
          {customerDetails[index] ? (
            <div>
              <h3>Bokat av:</h3>
              <p>
                Namn: {customerDetails[index].name}{" "}
                {customerDetails[index].lastname}
              </p>
              <p>Email: {customerDetails[index].email}</p>
              <p>Telefon: {customerDetails[index].phone}</p>
            </div>
          ): ""}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BookingList