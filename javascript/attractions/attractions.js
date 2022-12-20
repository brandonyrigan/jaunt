const api_key = '8b24f6a035744829a61c91ab2c71bc38';
const base_url = 'https://api.geoapify.com/v1/geocode/search?text=';
var requestOptions = {
    method: 'GET',
  };

//&format=json&apiKey=YOUR_API_KEY

//return a list of attractions
function getLongandLat(city) {
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=${api_key}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result.features[0].properties.lat);
        console.log(result.features[0].properties.lon);
        return [result.features[0].properties.lat, result.features[0].properties.lon];
    })
    
}
        







  function getAttractions(long, lat){
  const url =  `https://api.geoapify.com/v2/places?categories=tourism&filter=circle:${long},${lat},5000&bias=proximity:${long},${lat}&limit=20&apiKey=${api_key}`;
     try {
         const response =  fetch(url);
         if (response.ok) {
             const jsonResponse = response.json();
             const attractions = jsonResponse.features;
             const attractionsArray = attractions.map(attraction => {
                 return {
                     name: attraction.properties.name,
                     city: attraction.properties.city,
                     image: attraction.properties.image,
                     description: attraction.properties.description,
                     link: attraction.properties.wikipedia
                 }
             });
             return attractionsArray;
         }
     }
     catch (error) {
         console.log(error);
     }
 }


console.log(getLongandLat('New York'));