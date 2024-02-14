
import { Link } from "react-router-dom";

export const Footer = () => {
    
  return (
    <>
      <div className="wrapper">
        <div className="footer">
          <p className="adress">
            Restaurang Skog <br />
            Skogsvägen 1 <br />
            123 45 Skogen <br />
            <br />
            019-123 45 00
          </p>
          <p className="links">
            <button><Link to ="/booking">Boka bord</Link></button>
            <button><Link to ="/menu">Meny</Link></button>
          </p>
        </div>
        <p className="copy">&copy; Skog 2024. All rights reserved.</p>
      </div>
    </>
  );
};
