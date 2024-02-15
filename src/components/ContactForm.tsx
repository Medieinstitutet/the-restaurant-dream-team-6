import React from "react";
import { Link } from "react-router-dom";

export const ContactForm = () => {
  return (
    <>
      <div className="contact-info">
        <h3>Restaurang Skog</h3>
        <img src="/src/skog-logo.png" alt="" />
        <p>
          Skogsvägen 1 <br />
          123 45 Skogen
          <br />
          <br />
          Mejla eller ring oss på: <br /> skog@restaurang.se, 019-123 45 00
        </p>
        <p>Du kan också kontakta oss via vårt formulär.</p>
        <p>För att boka bord, gå till <Link to="/booking">bokningssidan.</Link></p>
      </div>

      <form className="contact-form">
        <h3>Kontaktformulär</h3>
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
    </>
  );
};
