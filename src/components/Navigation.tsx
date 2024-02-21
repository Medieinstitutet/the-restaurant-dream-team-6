import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";
import { useState } from "react";
import menu from "../img/menu.png"

export const Navigation = () => {
  

    const MobileNavigation = () => {
      const [isNavOpen, setNavOpen] = useState(false);

      const openNav = () => {
        setNavOpen(true);
      };

      const closeNav = () => {
        setNavOpen(false);
      };

      return (
        <>
          <span
            className={"open" + (isNavOpen ? " active" : "")}
            onClick={openNav}
          >
            <img className="menu" src={menu} alt="menu" />
          </span>

          {isNavOpen && (
            <div id="myNav" className="overlay">
              <a href="#" className="closebtn" onClick={closeNav}>
                &times;
              </a>
              <div className="overlay-content">
                <NavLink to={"/"}>Hem</NavLink>
                <NavLink to={"/booking"}>Boka bord</NavLink>
                <NavLink to={"/contact"}>Kontakt</NavLink>
                <NavLink to={"/menu"}>Meny</NavLink>
              </div>
            </div>
          )}
        </>
      );
    };


    return (
      <>
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
            <li>
              <NavLink to={"/menu"}>Meny</NavLink>
            </li>
          </ul>
          <MobileNavigation/>
        </nav>
      </>
    );
  };
