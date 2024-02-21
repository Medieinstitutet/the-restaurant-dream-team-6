import { useState, useEffect } from "react";
import axios from "axios";
import { IBookingdata } from "../models/IBookingdata";
import { ICustomerData } from "../models/ICustomerData";
import { IChangeBooking } from "../models/IChangeBooking";

export const BookingList = () => {
  const apiUrl = "https://school-restaurant-api.azurewebsites.net";
  const restaurantId = "65cb3f298d602db609b8b96d";

  const [bookings, setBookings] = useState<IBookingdata[]>([]);
  const [customerDetails, setCustomerDetails] = useState<ICustomerData[]>([]);
  const [updatedFormId, setUpdatedFormId] = useState<string | null>(null);
  const [editedBookings, setEditedBookings] = useState<Record<string, IChangeBooking>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true); 
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
      } catch (error) {
        console.error("Error fetching bookings", error);
      } finally {
        setIsLoading(false); // 
      }
    };

    fetchBookings();
  }, [apiUrl, restaurantId]);

 const handleDeleteBooking = async (bookingId: string) => {
   try {
     setIsLoading(true); 
     await axios.delete<IBookingdata>(`${apiUrl}/booking/delete/${bookingId}`);
     setBookings((deletebookings) =>
       deletebookings.filter((booking) => booking._id !== bookingId)
     );
   } catch (error) {
     console.error("Error deleting booking", error);
   } finally {
     setIsLoading(false); 
   }
 };

 const handleSaveClick = async (bookingId: string) => {
   const currentEditedBooking = bookingId
     ? editedBookings[bookingId]
     : editedBookings;

   if (currentEditedBooking && "_id" in currentEditedBooking) {
     try {
       setIsLoading(true); 

       const { _id, ...updatedBookingData } = currentEditedBooking;
       const bookingForUpdate = { id: _id, ...updatedBookingData };

       const response = await axios.put<IBookingdata>(
         `${apiUrl}/booking/update/${bookingId || _id}`,
         bookingForUpdate
       );

       const updatedBooking = response.data;

       setBookings((prevBooking) => {
         const updatedIndex = prevBooking.findIndex(
           (booking) => booking._id === updatedBooking._id
         );

         if (updatedIndex !== -1) {
           const newBookings = [...prevBooking];
           newBookings[updatedIndex] = updatedBooking;
           return newBookings;
         }

         return prevBooking;
       });

       setUpdatedFormId("");
     } catch (error) {
       console.error("Error updating booking", error);
     } finally {
       setIsLoading(false);
     }
   }
 };
  const handleEditClick = (bookingId: string) => {
    setUpdatedFormId(bookingId);
    const bookingToEdit = bookings.find(
      (booking) => booking._id === bookingId
    );
  
    if (bookingToEdit) {
      setEditedBookings((prevBooking) => ({
        ...prevBooking,
        [bookingId]: bookingToEdit as unknown as IChangeBooking, 
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    key: keyof IBookingdata,
    bookingId: string
  ) => {
    const { value } = e.target;
    
    setEditedBookings((prevBooking) => {
      return {
        ...prevBooking,
        [bookingId]: {
          ...prevBooking[bookingId],
          [key]: value}}
    });
  };

  

    return (
      <>
        <div className="wrapper">
          <h1>Bokningar</h1>
          {isLoading && <span className="loader"></span>}{" "}
          {/* Display loading indicator */}
          <div className="booking-container">
            {bookings.map((booking, index) => (
              <div className="booking-details" key={booking._id}>
                <label htmlFor="date">Datum: </label>
                <input
                  className="input-date"
                  type="date"
                  id="date"
                  name="date"
                  disabled={!updatedFormId || updatedFormId !== booking._id}
                  value={editedBookings[booking._id]?.date || booking.date}
                  onChange={(e) => handleInputChange(e, "date", booking._id)}
                />
                <label htmlFor="time">Tid: </label>
                <select
                  className="select"
                  id="time"
                  name="time"
                  disabled={!updatedFormId || updatedFormId !== booking._id}
                  value={editedBookings[booking._id]?.time || booking.time}
                  onChange={(e) => handleInputChange(e, "time", booking._id)}
                >
                  <option value="18:00">18:00</option>
                  <option value="21:00">21:00</option>
                </select>
                <br />
                <label className="guest-label" htmlFor="guests">
                  Antal Gäster:{" "}
                </label>
                <input
                  className="input-guests"
                  type="number"
                  id="guests"
                  name="numberOfGuests"
                  disabled={!updatedFormId || updatedFormId !== booking._id}
                  value={
                    editedBookings[booking._id]?.numberOfGuests ||
                    booking.numberOfGuests
                  }
                  onChange={(e) =>
                    handleInputChange(e, "numberOfGuests", booking._id)
                  }
                />

                {customerDetails[index] ? (
                  <div className="customer-details">
                    <h4>Bokat av:</h4>
                    <p>
                      <b>Namn: </b>
                      {customerDetails[index].name} {customerDetails[index].lastname} <br /> 
                      <b>Email: </b>
                      {customerDetails[index].email} <br />
                      <b>Telefon: </b>
                      {customerDetails[index].phone}
                    </p>
                    <div className="buttons">
                      {!updatedFormId || updatedFormId !== booking._id ? (
                        <button
                          className="update-button"
                          onClick={() => handleEditClick(booking._id)}
                        >
                          Ändra
                        </button>
                      ) : (
                        <button
                          className="update-button"
                          onClick={() => handleSaveClick(booking._id)}
                        >
                          Spara
                        </button>
                      )}
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteBooking(booking._id)}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
};

export default BookingList;
