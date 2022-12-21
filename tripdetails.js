import { getFlights } from "./javascript/flights/flights.js";
import { getAmadeusKey } from "./javascript/hotels/hotels.js";
import { getEvents, createCards } from "./javascript/tickets/ticketService.js"; 
import {getWeather} from "./javascript/weather/weather.js";
import {getCity} from "./javascript/helper/helpers.js";


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
<<<<<<< HEAD
  // getFlights(tripDetails);
  getAmadeusKey(tripDetails);
=======
//  getFlights(tripDetails);
// return city name from form input
  
  const city = await getCity(tripDetails.toLocation);

  
  getWeather(city);
  
  const events = getEvents(city).then
  (event => {
    createCards(event);
  });
  

 // getFlights(tripDetails);
 // getAmadeusKey(tripDetails);
>>>>>>> bf3bc5c025d57af72f5f937e88f0f1a554ae21cd
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
  tripNameHeader.innerText = localStorage.getItem("tripName");
  tripLocationHeader.innerText = `${localStorage.getItem(
    "fromLocation"
  )} - ${localStorage.getItem("toLocation")}`;
  tripDatesHeader.innerText = `${localStorage.getItem(
    "startDate"
  )} - ${localStorage.getItem("endDate")}`;
}
