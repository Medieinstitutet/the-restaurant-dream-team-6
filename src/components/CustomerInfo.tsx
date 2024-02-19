import React, { useState } from "react";
import { BookingInfo } from "../types";

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

	const handleConfirmBooking = async () => {
		// Validering av formuläret innan bokningen skapas
		if (name && lastname && email && phone && gdprApproved) {
			onSubmit({ name, lastname, email, phone, gdprApproved });

			await onConfirm();
		} else {
			setErrorMessage("Alla fält måste fyllas i och GDPR godkännas för att bokningen ska kunna slutföras.");
		}
	};

	//Renderar formulär för användarens information
	return (
		<div className="booking">
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
				required
			/>
			<label>Telefonnummer: </label>
			<input
				type="tel"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				required
			/>
			<label>
				<input
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
