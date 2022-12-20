import { FLIGHT_API_KEY } from "../api_keys/keys.js";

const flightBaseUrl = `https://api.flightapi.io/`;

function getFlights(userInput) {
    let apiUrl = `${flightBaseUrl}roundtrip/${FLIGHT_API_KEY}/${userInput.fromLocation}/${userInput.toLocation}/${userInput.startDate}/${userInput.endDate}/1/0/0/Economy/USD`;

    fetch(apiUrl)
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
                    flights[flightIndex].url = fare.handoffUrl;
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
        const flightUrl = document.createElement("td");

        flightTimes.innerText = `${flight.departureTime} - ${flight.arrivalTime}`;
        flightDuration.innerText = `${flight.duration}`;
        flightStops.innerText = `${flight.stopoversCount}`;
        flightPrice.innerText = `${flight.price}`;
        flightUrl.innerHTML = `<a href="${flight.url}" class="btn btn-success" target="_blank">Website</a>`;

        tableRow.appendChild(flightTimes);
        tableRow.appendChild(flightDuration);
        tableRow.appendChild(flightStops);
        tableRow.appendChild(flightPrice);
        tableRow.appendChild(flightUrl);
        flightTableBody.appendChild(tableRow);
    }
}

export { getFlights };
