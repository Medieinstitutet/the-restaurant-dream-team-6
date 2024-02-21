import React, { useState } from "react";
import CheckTables from "./CheckTables";
import CustomerInfo from "./CustomerInfo";
import Confirmation from "./Confirmation";
import axios from "axios";
import { restaurantId } from "../services/api";
import "../styles/_bookingform.scss";
import { useEffect } from "react";

//interface för bokningsdata
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
	const [loading, setLoading] = useState(false);
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

	//Steg 1: Hantera bokningsinformationen
	const handleStep1Submit = (data: { date: string; time: string; numberOfGuests: number }) => {
		setBookingInfo((prevData) => ({ ...prevData, ...data }));
		setStep(2);
	};

	//Steg 2: Hantera användarinformationen
	const handleStep2Submit = (customerData: { name: string; lastname: string; email: string; phone: string }) => {
		// validera användarens information innan bokningen skapas
		if (!customerData.name || !customerData.lastname || !customerData.email || !customerData.phone) {
			setErrorMessage("Samtliga fält är obligatoriska och måste vara korrekt ifyllda.");
			return;
		}
		setBookingInfo((prevData) => ({
			...prevData,
			customer: {
				...prevData.customer,
				...customerData,
			},
		}));
		setStep(3);
	};

	//Skickar bokningen till API:et
	useEffect(() => {
		if (step === 3) {
			const makePostRequest = async () => {
				setLoading(true);
				try {
					await axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", {
						restaurantId,
						date: bookingInfo.date,
						time: bookingInfo.time,
						numberOfGuests: bookingInfo.numberOfGuests,
						customer: bookingInfo.customer,
					});

					setIsBookingConfirmed(true);
				} catch (error) {
					console.error("Fel vid skapandet av bokning:", error);
					setErrorMessage("Något gick fel vid bokning. Försök igen senare eller ring oss för att få hjälp.");
				} finally {
					setLoading(false);
				}
			};

			makePostRequest();
		}
	}, [step, bookingInfo]);

	//Renderar varje steg i bokningen
	return (
		<div className="bookingForm">
			{errorMessage && <p>{errorMessage}</p>}
			{loading && <span className="loader"></span>}
			{step === 1 && <CheckTables onSubmit={handleStep1Submit} />}
			{step === 2 && (
				<CustomerInfo
					onSubmit={handleStep2Submit}
					onConfirm={() => setStep(3)}
					bookingInfo={bookingInfo}
				/>
			)}
			{isBookingConfirmed && (
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
