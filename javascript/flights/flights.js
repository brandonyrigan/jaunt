import FLIGHT_API_KEY from "../api_keys/keys.js";

const flightBaseUrl = `https://api.flightapi.io/`;

function getFlights(userInput) {
    let apiUrl = `${flightBaseUrl}roundtrip/${FLIGHT_API_KEY}/${userInput.from}/${userInput.to}/${userInput.startDate}/${userInput.endDate}/${userInput.adults}/${userInput.children}/${userInput.infants}/Economy/USD`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            let flights = [];
            let flightDetails = {};
            let flightsMap = new Map();
            let legCount = 0;
            for (let i = 0; i < 10; i++) {
                flightDetails.id = response.trips[i].id;
                flightsMap.set(response.trips[i].id, i);
                flightDetails.legIds = response.trips[i].legIds;
                flightsMap.set(response.trips[i].legIds[0], i);
                flightsMap.set(response.trips[i].legIds[1], i);
                flights.push(flightDetails);
            }

            for (let fare of response.fares) {
                if (tripCount == 10) {
                    tripCount = 0;
                    break;
                }
                if (flightsMap.has(fare.tripId)) {
                    let flightIndex = flightsMap.get(fare.tripId);
                    flights[flightIndex].flightDetails.price =
                        fare.price.totalAmountUsd;
                    tripCount++;
                }
            }

            for (let leg of response.legs) {
                if (flightsMap.has(leg.id)) {
                    let flightIndex = flightsMap.get(leg.id);
                    flights[flightIndex].flightDetails.departureTime =
                        leg.departureTime;
                    flights[flightIndex].flightDetails.arrivalTime =
                        leg.arrivalTime;
                    flights[flightIndex].flightDetails.duration = leg.duration;
                    flights[flightIndex].flightDetails.stopoversCount =
                        leg.stopoversCount;
                }
            }
            showFlights(flights);
        })
        .catch((err) => reject(err));
}

function showFlights(flights) {
    for (flight of flights) {
        const tableRow = document.createElement("tr");
        const flightTimes = document.createElement("td");
        const flightDuration = document.createElement("td");
        const flightStops = document.createElement("td");
        const flightPrice = document.createElement("td");
    }
}

export { getFlights };
