import React from "react";

//interface för props till bokningsbekräftelse
interface ConfirmationProps {
	customerData: {
		name: string;
		time: string;
		date: string;
	};
}

const Confirmation: React.FC<ConfirmationProps> = ({ customerData }) => {
	const dateObject = new Date(customerData.date);

	// Formatera datumet till YYYY-MM-DD
	const formattedDate = dateObject.toISOString().split("T")[0];

	//Renderar bokningsbekräftelsen till användaren
	return (
		<div>
			<p>
				Tack för din bokning, {customerData.name}! Välkommen till bords kl. {customerData.time}, den {formattedDate}.
			</p>
		</div>
	);
};

export default Confirmation;
