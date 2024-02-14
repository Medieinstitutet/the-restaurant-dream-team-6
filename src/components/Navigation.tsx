import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png"

export const Navigation = () => {
    return (
      <nav className="navigation">
        <img src={logo} alt="Logo of the restaurant" />
        <ul className="nav-ul">
          <li>
            <NavLink to={"/"}>Hem</NavLink>
          </li>
          <li>
            <NavLink to={"/booking"}>Boka bord</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Kontakt</NavLink>
          </li>
        </ul>
      </nav>
    );
  };