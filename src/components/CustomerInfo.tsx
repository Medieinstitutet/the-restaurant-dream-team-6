import React, { useState } from "react";
import { BookingInfo } from "../types";
import "../styles/_customerinfo.scss";

//interface props för användarens information
interface CustomerInfoProps {
	onSubmit: (customerData: { name: string; lastname: string; email: string; phone: string; gdprApproved: boolean }) => void;
	onConfirm: () => void;
	bookingInfo: BookingInfo;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ onSubmit, onConfirm }) => {
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [gdprApproved, setGdprApproved] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// Validera e-post och telefonnummer med Regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^[0-9-+\s]*$/;

	const validFields = () => {
		return name && lastname && email && emailRegex.test(email) && phone && phoneRegex.test(phone) && gdprApproved;
	};

	const handleConfirmBooking = async () => {
		// Validering av formuläret innan bokningen skapas
		if (validFields()) {
			onSubmit({ name, lastname, email, phone, gdprApproved });
			onConfirm();
		} else {
			setErrorMessage("Samtliga fält är obligatoriska och måste vara korrekt ifyllda.");
		}
	};

	//Renderar formulär för användarens information
	return (
		<div className="customerInfo">
			<label>Förnamn: </label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<label>Efternamn: </label>
			<input
				type="text"
				value={lastname}
				onChange={(e) => setLastname(e.target.value)}
				required
			/>
			<label>E-post: </label>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="exempel@domän.se"
				required
			/>
			<label>Telefonnummer: </label>
			<input
				type="tel"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				placeholder="070-123 45 67"
				required
			/>
			<label>
				<input
					className="gdpr"
					type="checkbox"
					checked={gdprApproved}
					onChange={() => setGdprApproved(!gdprApproved)}
					required
				/>
				Jag samtycker enligt GDPR
			</label>
			<button
				onClick={handleConfirmBooking}
				disabled={!name || !lastname || !email || !phone || !gdprApproved}
			>
				Bekräfta bokning
			</button>
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	);
};

export default CustomerInfo;
