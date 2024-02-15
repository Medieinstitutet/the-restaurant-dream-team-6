import { StartPage } from "../components/StartPage"
import restaurantpic from "../img/restaurant.jpg"

export const Home = () => {
    return <>
    <div className="home-header">
        <div className="overlay"></div>
    <h1>Skog</h1>
    <img className="restaurantpic" src={restaurantpic} alt="A picture of a restaurant" />
    </div>
    <StartPage/>
    </>
}