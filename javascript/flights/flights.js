import FLIGHT_API_KEY from "../api_keys/keys.js";

const flightBaseUrl = `https://api.flightapi.io/`;

const getFlights = (userInput) => {
    let apiUrl = `${flightBaseUrl}roundtrip/${FLIGHT_API_KEY}/${userInput.from}/${userInput.to}/${userInput.startDate}/${userInput.endDate}/${userInput.adults}/${userInput.children}/${userInput.infants}/Economy/USD`;

    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                resolve(json);
            })
            .catch((err) => reject(err));
    });
};

export { getFlights };
