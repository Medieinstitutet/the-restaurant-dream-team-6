import React, { useState } from "react";
import axios from "axios";
import DatePicker, { registerLocale } from "react-datepicker";
import { sv } from "date-fns/locale/sv";
import "react-datepicker/dist/react-datepicker.css";
import { restaurantId } from "../services/api";

registerLocale("sv", sv);

interface CheckTablesProps {
	onSubmit: (data: { date: string; time: string; numberOfGuests: number }) => void;
}

//CheckTables-komponenten som kollar tillgängligheten
const CheckTables: React.FC<CheckTablesProps> = ({ onSubmit }) => {
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState("");
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [availableTimes, setAvailableTimes] = useState<string[]>([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [hasChecked, setHasChecked] = useState(false);

	const handleCheckAvailability = async () => {
		setAvailableTimes([]);
		setErrorMessage("");
		setHasChecked(true);

		try {
			const response = await axios.get(`https://school-restaurant-api.azurewebsites.net/booking/restaurant/${restaurantId}?date=${date.toISOString()}`);

			const bookings = response.data;
			const totalAvailableTables = 15 * 6;

			const bookedSeats = bookings.reduce((total: number, booking: any) => total + parseInt(booking.numberOfGuests), 0);
			const availableSeats = totalAvailableTables - bookedSeats;

			if (availableSeats >= numberOfGuests) {
				setErrorMessage("");
				//Filtrera bokningar baserat på antal gäster och hämta lediga tider
				const availableTimesForGuests = bookings.filter((booking: any) => parseInt(booking.numberOfGuests) >= numberOfGuests).map((booking: any) => booking.time);

				setAvailableTimes([...new Set(availableTimesForGuests as string[])]);
			} else {
				setErrorMessage("Tyvärr finns det inga lediga bord vid detta datum och tid. Vänligen välj en annan tid.");
			}
		} catch (error) {
			console.error("Fel vid koll av tillgängliga tider:", error);
			setErrorMessage("Något gick fel vid koll av tillgängliga tider. Försök igen senare eller ring oss för att få hjälp.");
		}
	};

	//Renderar formuläret för att kolla tillgängligheten
	return (
		<div className="booking">
			<label>Datum: </label>
			<DatePicker
				selected={date}
				onChange={(date: Date) => setDate(date)}
				locale="sv"
			/>
			<label>Antal gäster: </label>
			<input
				type="number"
				min="1"
				max="90"
				value={numberOfGuests}
				onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
			/>
			<button onClick={handleCheckAvailability}>Sök efter lediga tider</button>
			{errorMessage && <p>{errorMessage}</p>}
			{availableTimes.length > 0 ? (
				<>
					<p>Tillgängliga tider:</p>
					{availableTimes.map((time, index) => (
						<div key={index}>
							<input
								type="radio"
								id={`time-${index}`}
								name="time"
								value={time}
								onChange={() => setTime(time)}
							/>
							<label htmlFor={`time-${index}`}>{time}</label>
						</div>
					))}
					<button onClick={() => onSubmit({ date: date.toISOString(), time, numberOfGuests })}>Gå vidare</button>
				</>
			) : (
				hasChecked && <p>Tyvärr finns det inga lediga bord vid detta datum och tid. Vänligen välj en annan tid.</p>
			)}
		</div>
	);
};

export default CheckTables;
