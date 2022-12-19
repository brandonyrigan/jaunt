import { getFlights } from "./javascript/flights/flights.js";

tripCard.addEventListener("click", handleClick);

function handleClick(event) {
    getFlights();
}
