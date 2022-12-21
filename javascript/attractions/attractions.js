const api_key = '8b24f6a035744829a61c91ab2c71bc38';
const base_url = 'https://api.geoapify.com/v1/geocode/search?text=';
var requestOptions = {
    method: 'GET',
  };

//&format=json&apiKey=YOUR_API_KEY

//return a list of attractions
async function getLongandLat(city) {
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=${api_key}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        const long = result.results[0].lon;
        const lat = result.results[0].lat;
        console.log(long, lat);
        getAttractions(long, lat);
    }
    )
    .catch(error => console.log('error', error));
}



        






// return a list of attractions names, lat, long, and address for a given city
  function getAttractions(long, lat){
    fetch(`https://api.geoapify.com/v2/places?categories=tourism&filter=circle:${long},${lat},5000&bias=proximity:${long},${lat}&limit=20&apiKey=${api_key}`)
    .then(response => response.json())
    .then(result => {
        console.log(result.features);
        const attractions = result.features.map(attraction => {
            return {
                name: attraction.properties.name,
                lat: attraction.properties.lat,
                long: attraction.properties.lon,
                address: attraction.properties.formatted_address
            }
        })
        console.log(attractions);
        return attractions;
    })
    .catch(error => console.log('error', error));
    }





const c = getLongandLat('Seattle');
console.log(c);
