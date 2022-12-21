// open file in browser to see output in console


// look up airportCode return city name
async function getCity(airportCode) {
    const airport = await fetch("javascript/data/airports.json");
    const airportJson =  await airport.json();

    const city = airportJson.find(a => a.IATA == airportCode);

    return city.city;
    
}


export { getCity };



