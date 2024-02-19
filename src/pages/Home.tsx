import { StartPage } from "../components/StartPage"
import restaurantpic from "../img/restaurant.jpg"

export const Home = () => {
    return <>
    <div className="home-header">
        <div className="overlay-home"></div>
    <h1>Skog</h1>
    <img className="restaurantpic" src={restaurantpic} alt="A picture of a restaurant" />
    </div>
    <section className="text">
        <h2>Om oss</h2>
        <p>Skog erbjuder en mångsidig mening av mat, från lokala specialiteter till internationella klassiker. Maten är tillagad med hög kvalitet och särskilt uppmärksamhet ges till att maten är frisk och innehåller lokala råvaror. </p>
        <p>Restaurangen är öppen för middag och kvällsmat, och bjuder också på en mängd olika drycker, från lokala öl till fina vin. Varmt välkomna till oss!</p>
    </section>
    <StartPage/>
    </>
}