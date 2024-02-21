import React, { useState } from "react";
import axios from "axios";
import DatePicker, { registerLocale } from "react-datepicker";
import { sv } from "date-fns/locale/sv";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { restaurantId } from "../services/api";
import "../styles/_checktables.scss";

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
	const [isLoading, setIsLoading] = useState(false);

	const handleCheckAvailability = async () => {
		setAvailableTimes([]);
		setErrorMessage("");
		setIsLoading(true);

		try {
			const response = await axios.get(`https://school-restaurant-api.azurewebsites.net/booking/restaurant/${restaurantId}?date=${formattedDate}`);

			const bookings = response.data;
			const totalAvailableSeats = 15 * 6;

			// Skapa en lista för de två sittningarna
			const allTimes = ["18:00", "21:00"];

			// Beräkna antalet lediga platser för varje sittning
			const availableTimesForGuests = allTimes.filter((time) => {
				const bookingsAtThisTime = bookings.filter((booking: any) => booking.time === time);
				const bookedSeatsAtThisTime = bookingsAtThisTime.reduce((total: number, booking: any) => total + parseInt(booking.numberOfGuests), 0);
				const availableSeatsAtThisTime = totalAvailableSeats - bookedSeatsAtThisTime;
				return availableSeatsAtThisTime >= numberOfGuests;
			});

			if (availableTimesForGuests.length > 0) {
				setErrorMessage("");
				setAvailableTimes(availableTimesForGuests);
			} else {
				setErrorMessage("Tyvärr finns det inga lediga bord vid detta datum och tid. Vänligen välj en annan tid.");
			}

			setHasChecked(true);
		} catch (error) {
			console.error("Fel vid koll av tillgängliga tider:", error);
			setErrorMessage("Något gick fel vid koll av tillgängliga tider. Försök igen senare eller ring oss för att få hjälp.");
		} finally {
			setIsLoading(false);
		}
	};

	const formattedDate = format(date, "yyyy-MM-dd");

	//Renderar formuläret för att låta användaren kolla tillgängligheten
	return (
		<div className="booking">
			{isLoading ? (
				<p>Hämtar tillgängliga tider..</p>
			) : (
				<>
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
					<button onClick={handleCheckAvailability}>Kolla tillgänglighet</button>
					{errorMessage && <p>{errorMessage}</p>}
					{availableTimes.length > 0 ? (
						<>
							<div className="availableTimes">
								<p>Tillgängliga tider:</p>
								{availableTimes.map((time, index) => (
									<div
										className="radios"
										key={index}
									>
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
							</div>
							<button onClick={() => onSubmit({ date: formattedDate, time, numberOfGuests })}>Gå vidare</button>
						</>
					) : (
						hasChecked && <p>Tyvärr finns det inga lediga bord vid detta datum och tid. Vänligen välj en annan tid.</p>
					)}
				</>
			)}
		</div>
	);
};

export default CheckTables;
