import React from "react";

export const ContactForm = () => {
  return (
    <>
      <div className="contact-form">
        <form>
          <input
            name="name"
            type="text"
            className="contact-input"
            placeholder="Namn"
            required
          />
          <input
            name="email"
            type="text"
            className="contact-input"
            placeholder="Email"
            required
          />
          <textarea
            name="text"
            className="contact-input"
            placeholder="Meddelande"
          ></textarea>
          <input type="submit" value="Skicka" />
        </form>
      </div>
      <div className="contact-info">
        <h3>Restaurang Skog</h3>
        <p>
          <b>Epost:</b> skog@restaurang.se
        </p>
        <p>
          <b>Mobil:</b> 900 - SKOG
        </p>
      </div>
      
    </>
  );
};
