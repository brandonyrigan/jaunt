const api_key = '8b24f6a035744829a61c91ab2c71bc38';
const base_url = 'https://api.geoapify.com/v1/geocode/search?text=';
var requestOptions = {
    method: 'GET',
  };

//&format=json&apiKey=YOUR_API_KEY


async function getLongandLat(city) {
    await fetch(`https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=${api_key}`, requestOptions)
    .then(response => response.json())
    .then(async result => {
        const long = await result.results[0].lon;
        const lat = await result.results[0].lat;
        console.log(long, lat);
        getAttractions(long, lat);
    }
    )
    .catch(error => console.log('error', error));
}



        







  async function getAttractions(long, lat){
    fetch(`https://api.geoapify.com/v2/places?categories=tourism&filter=circle:${long},${lat},5000&bias=proximity:${long},${lat}&limit=20&apiKey=${api_key}`)
    .then(response => response.json())
    .then( async result => {
        console.log(result.features);
        const attractions = await result.features.map(attraction => {
            return {
                name: attraction.properties.name,
                lat: attraction.properties.lat,
                long: attraction.properties.lon,
                address: attraction.properties.formatted_address
            }
        })
        console.log(attractions);
        displayAttractions(attractions);
        
    })
    .catch(error => console.log('error', error));
    }



async function displayAttractions(attractions){
    const attractionsContainer = document.getElementById('attractions');
    for(let i = 0; i < attractions.length; i++){
        const attraction = attractions[i];
        const attractionElement = document.createElement('tr');
        attractionElement.innerHTML = `
        <td>${attraction.name}</td>
        <td><a href="https://maps.google.com/?q=${attraction.lat},${attraction.long}">View on Google Maps</a></td>
        `;
        attractionsContainer.appendChild(attractionElement);
    
}
}









export{getLongandLat};



