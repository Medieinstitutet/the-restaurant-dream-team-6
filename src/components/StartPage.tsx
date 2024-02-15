import tables from "../img/tables.png"
import chef from "../img/chef.jpg"

export const StartPage = () => {

    return <>
    <section className="home-split">
    <div className="home-menu">
        <h2>Se vår meny här</h2>
        <button className="home-btn">Meny</button>
        <div className="img-container">
        <img src={chef} alt="A chef cooking" />
        </div>
    </div>

    <div className="home-booking" >
        <h2>Boka bord här</h2>
        <button className="home-btn">Boka bord</button>
        <div className="img-container">
        <img src={tables} alt="The restaurant's interior" />
        </div>
    </div>
    </section>
    </>
}