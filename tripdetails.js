import { getFlights } from "./javascript/flights/flights.js";
import { getAmadeusKey } from "./javascript/hotels/hotels.js";
import { getEvents, createCards } from "./javascript/tickets/ticketService.js";
import { getWeather } from "./javascript/weather/weather.js";
import { getCity } from "./javascript/helper/helpers.js";
import	{getLongandLat} from "./javascript/attractions/attractions.js"

window.onload = async (event) => {
  let tripDetails = {
    tripName: localStorage.getItem("tripName"),
    fromLocation: localStorage.getItem("fromLocation"),
    toLocation: localStorage.getItem("toLocation"),
    startDate: localStorage.getItem("startDate"),
    endDate: localStorage.getItem("endDate"),
    numberOfAdults: localStorage.getItem("numberOfAdults"),
  };
  console.log(tripDetails);
  loadTripDetailsHeader();

  // getFlights(tripDetails);
  getAmadeusKey(tripDetails);

  const city = await getCity(tripDetails.toLocation);

  getWeather(city);

<<<<<<< HEAD
  const events = getEvents(city).then((event) => {
    createCards(event);
  });
=======
	const events = getEvents(city).then((event) => {
		createCards(event);
	});

	getLongandLat(city);
>>>>>>> a3c6bc2805b4442cfb17aca0b268c94ee648dfce
};

myTab.addEventListener("click", (event) => {
  console.log("click");
  console.log(event);
  let parent = event.target.parentElement.parentElement;
  switch (event.target.innerText) {
    case "Flights":
      console.log("flights");
      for (let child of parent.children) {
        child.lastElementChild.classList.remove("focus");
      }
      event.target.classList.add("focus");
      break;
    case "Hotels":
      console.log("hotels");
      for (let child of parent.children) {
        child.lastElementChild.classList.remove("focus");
      }
      event.target.classList.add("focus");
      break;
    case "Events":
      console.log("events");
      for (let child of parent.children) {
        child.lastElementChild.classList.remove("focus");
      }
      event.target.classList.add("focus");
      break;
    case "Weather":
      console.log("weather");
      for (let child of parent.children) {
        child.lastElementChild.classList.remove("focus");
      }
      event.target.classList.add("focus");
      break;
    default:
      break;
  }
});

function loadTripDetailsHeader() {
  console.log(localStorage);
  tripNameHeader.innerText = localStorage.getItem("tripName");
  tripLocationHeader.innerText = `${localStorage.getItem(
    "fromLocation"
  )} - ${localStorage.getItem("toLocation")}`;
  tripDatesHeader.innerText = `${localStorage.getItem(
    "startDate"
  )} - ${localStorage.getItem("endDate")}`;
}
