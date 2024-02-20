import React, { useState } from "react";
import CheckTables from "./CheckTables";
import CustomerInfo from "./CustomerInfo";
import Confirmation from "./Confirmation";
import axios from "axios";
import { restaurantId } from "../services/api";

// interface för bokningsdata
interface BookingInfo {
	date: string;
	time: string;
	numberOfGuests: number;
	customer: {
		name: string;
		lastname: string;
		email: string;
		phone: string;
	};
}

const BookingForm: React.FC = () => {
	const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
		date: "",
		time: "",
		numberOfGuests: 0,
		customer: {
			name: "",
			lastname: "",
			email: "",
			phone: "",
		},
	});
	const [step, setStep] = useState<number>(1);
	const [errorMessage, setErrorMessage] = useState<string>("");

	//Funktion som hanterar steg 1 formuläret - kolla tillgängligheten
	const handleStep1Submit = (data: { date: string; time: string; numberOfGuests: number }) => {
		setBookingInfo((prevData) => ({ ...prevData, ...data }));
		setStep(2);
	};

	//Funktioner som hanterar steg 2 formuläret - customer info
	const handleStep2Submit = (customerData: { name: string; lastname: string; email: string; phone: string }) => {
		setBookingInfo((prevData) => ({ ...prevData, customer: customerData }));
		setStep(3);
	};

	const [loading, setLoading] = useState(false);

	//Funktion som hanterar bokningsbekräftelsen
	const handleConfirmation = async () => {
		setLoading(true);
		try {
			// skicka POST requesten till API:et för att skapa bokningen
			await axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", {
				restaurantId,
				date: bookingInfo.date,
				time: bookingInfo.time,
				numberOfGuests: bookingInfo.numberOfGuests,
				customer: bookingInfo.customer,
			});

			console.log("Bokning skapad, går vidare till steg 4"); //felsökning av koden

			// om bokningen lyckas, gå vidare till steg 4
			setStep(4);
		} catch (error) {
			console.error("Fel vid skapandet av bokning:", error);
			setErrorMessage("Något gick fel vid bokning. Försök igen senare eller ring oss för att få hjälp.");
		} finally {
			setLoading(false);
		}
	};

	//Rendera varje steg i bokningen
	return (
		<div>
			{errorMessage && <p>{errorMessage}</p>}
			{loading && <p>Laddar..</p>}
			{step === 1 && <CheckTables onSubmit={handleStep1Submit} />}
			{step === 2 && (
				<CustomerInfo
					onSubmit={handleStep2Submit}
					onConfirm={handleConfirmation}
					bookingInfo={bookingInfo}
				/>
			)}
			{step === 3 && (
				<Confirmation
					customerData={{
						name: bookingInfo.customer.name,
						time: bookingInfo.time,
						date: bookingInfo.date,
					}}
				/>
			)}
		</div>
	);
};

export default BookingForm;
