

export const Footer = () => {
  return (
    <>
      <div className="wrapper">
        <div className="footer">
          <div className="adress">
            <h3>Kontakt</h3>
            <p>
              Restaurang Skog <br />
              Skogsvägen 1 <br />
              123 45 Skogen <br />
              <br />
              019-123 45 00
            </p>
          </div>
          <div className="open-hours">
            <h3>Öppettider</h3>
            <p>Måndag - torsdag 16:00 - 23:00</p>
            <p>Fredag - lördag 15:00 - 02:00</p>
          </div>
          <div className="links">
            <h3>Sociala medier</h3>
            <a href="http://facebook.com">
              <img src="/src/img/facebookicon.png" alt="" />
            </a>
            <a href="http://instagram.com">
              <img src="/src/img/instaicon.png" alt="" />
            </a>
            <a href="http://tiktok.com">
              <img src="/src/img/tiktokicon.png" alt="" />
            </a>
          </div>
        </div>
        <p className="copy">&copy; Skog 2024. All rights reserved.</p>
      </div>
    </>
  );
};
