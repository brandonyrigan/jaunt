const apiKey = "639cb3677ad1a991c15beae4";
const flightBaseUrl = `https://api.flightapi.io/`;

const getFlights = (userInput) => {
    let apiUrl = `${flightBaseUrl}roundtrip/${apiKey}/${userInput.from}/${userInput.to}/${userInput.startDate}/${userInput.endDate}/${userInput.adults}/${userInput.children}/${userInput.infants}/Economy/USD`;

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
