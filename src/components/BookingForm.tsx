import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import sv from "date-fns/locale/sv";
import "react-datepicker/dist/react-datepicker.css";
import { restaurantId } from "../services/api";
import ConfirmedBooking from "./ConfirmedBooking";
import FailedBooking from "./FailedBooking";

registerLocale("sv", sv);

const BookingForm: React.FC = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState("18:00");
	const [bookingStatus, setBookingStatus] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// datum till rätt format YYYY-MM-DD
		const dateStamp = selectedDate.toISOString().substring(0, 10);

		const bookingData = {
			restaurantId,
			date: dateStamp,
			time: selectedTime,
			numberOfGuests,
			customer: {
				name: firstName,
				lastname: lastName,
				email: email,
				phone: phone,
			},
		};

		try {
			const response = await axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", bookingData, {
				headers: {
					Authorization: `Bearer ${restaurantId}`,
				},
			});

			setBookingStatus("successful");

			setFirstName("");
			setLastName("");
			setEmail("");
			setPhone("");
			setNumberOfGuests(1);
			setSelectedDate(new Date());
			setSelectedTime("18:00");
		} catch (error) {
			setBookingStatus("failed");
			console.error(error);
		}
	};

	return (
		<>
			<form
				className="form"
				onSubmit={handleSubmit}
			>
				<label htmlFor="firstName">Förnamn:</label>
				<input
					type="text"
					id="firstName"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>

				<label htmlFor="lastName">Efternamn:</label>
				<input
					type="text"
					id="lastName"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>

				<label htmlFor="email">E-post:</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor="phone">Telefonnummer:</label>
				<input
					type="tel"
					id="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				<label htmlFor="numberOfGuests">Antal i sällskapet:</label>
				<select
					id="numberOfGuests"
					value={numberOfGuests}
					onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
				>
					{[1, 2, 3, 4, 5, 6].map((number) => (
						<option
							key={number}
							value={number}
						>
							{number}
						</option>
					))}
				</select>

				<label htmlFor="date">Datum:</label>
				<DatePicker
					id="date"
					className="datepicker"
					dateFormat="yyyy-MM-dd"
					selected={selectedDate}
					onChange={(date: Date | null) => setSelectedDate(date ? date : new Date())}
					locale="sv"
				/>

				<label htmlFor="time">Tid:</label>
				<select
					id="time"
					value={selectedTime}
					onChange={(e) => setSelectedTime(e.target.value)}
				>
					<option value="18:00">18:00</option>
					<option value="21:00">21:00</option>
				</select>

				<button
					className="bookBtn"
					type="submit"
				>
					Boka bord
				</button>
			</form>
			{bookingStatus === "successful" && <ConfirmedBooking />}
			{bookingStatus === "failed" && <FailedBooking />}
		</>
	);
};

export default BookingForm;
