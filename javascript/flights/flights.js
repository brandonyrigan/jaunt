import { FLIGHT_API_KEY } from "../api_keys/keys.js";

const flightBaseUrl = `https://api.flightapi.io/`;

function getFlights() {
  //let apiUrl = `${flightBaseUrl}roundtrip/${FLIGHT_API_KEY}/${userInput.from}/${userInput.to}/${userInput.startDate}/${userInput.endDate}/${userInput.adults}/${userInput.children}/${userInput.infants}/Economy/USD`;

  fetch(
    "https://api.flightapi.io/roundtrip/639cb3677ad1a991c15beae4/LAS/DEN/2023-2-11/2023-2-13/1/0/0/Economy/USD"
  )
    .then((res) => res.json())
    .then((response) => {
      let flights = [];
      let flightsMap = new Map();
      for (let i = 0; i < 10; i++) {
        let flightDetails = {};
        flightDetails.id = response.trips[i].id;
        flightsMap.set(response.trips[i].id, i);
        flightDetails.legIds = response.trips[i].legIds;
        flightsMap.set(response.trips[i].legIds[0], i);
        flightsMap.set(response.trips[i].legIds[1], i);
        flights.push(flightDetails);
      }

      for (let fare of response.fares) {
        if (flightsMap.has(fare.tripId)) {
          let flightIndex = flightsMap.get(fare.tripId);
          flights[flightIndex].price = fare.price.totalAmountUsd;
        }
      }

      for (let leg of response.legs) {
        if (flightsMap.has(leg.id)) {
          let flightIndex = flightsMap.get(leg.id);
          flights[flightIndex].departureTime = leg.departureTime;
          flights[flightIndex].arrivalTime = leg.arrivalTime;
          flights[flightIndex].duration = leg.duration;
          flights[flightIndex].stopoversCount = leg.stopoversCount;
        }
      }
      showFlights(flights);
    })
    .catch((err) => console.log(err));
}

function showFlights(flights) {
  for (let flight of flights) {
    const tableRow = document.createElement("tr");
    const flightTimes = document.createElement("td");
    const flightDuration = document.createElement("td");
    const flightStops = document.createElement("td");
    const flightPrice = document.createElement("td");

    flightTimes.innerText = `${flight.departureTime} - ${flight.arrivalTime}`;
    flightDuration.innerText = `${flight.duration}`;
    flightStops.innerText = `${flight.stopoversCount}`;
    flightPrice.innerText = `${flight.price}`;

    tableRow.appendChild(flightTimes);
    tableRow.appendChild(flightDuration);
    tableRow.appendChild(flightStops);
    tableRow.appendChild(flightPrice);
    flightTableBody.appendChild(tableRow);
  }
}

export { getFlights };
