import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
    return (
      <nav>
        <ul>
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