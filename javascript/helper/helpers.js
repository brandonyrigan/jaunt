
// return string of city name
async function getCity(airportCode) {
    const airport = fetch("javascript/data/airports.json");
    airport.then(function (response) {
        return response.json();
    }).then(function (json) {
        for (let i = 0; i < json.length; i++) {
            if (json[i].IATA === airportCode) {
                console.log(json[i].city);
                return String(json[i].city);
            }
        }
    });
}

export { getCity };




