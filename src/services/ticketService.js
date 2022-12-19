

const baseurl = 'https://app.ticketmaster.com/discovery/v2/events.json?';
const apikey = 'Lb9duPQSfmOhyMAeBS88Dxum5ksUZAPO';


async function getEvents(cityName) {
  const urlToFetch = baseurl + 'apikey=' + apikey + '&city=' + cityName;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const events = jsonResponse._embedded.events;
      const eventsSet = new Set();
      const eventsSetArray = events.filter(event => {
        const value = eventsSet.has(event.name);
        eventsSet.add(event.name);
        return !value;
      });
      const eventsArray = eventsSetArray.map(event => {
        return {
          name: event.name,
          city: event._embedded.venues[0].city.name,
          image: event.images[0].url,
          venue: event._embedded.venues[0].name,
          date: event.dates.start.localDate,
          link: event.url
          
        }
      });
      return eventsArray;
    }
  } catch (error) {
    console.log(error);
  }
}




function createCards(cardData) {
  // Create a container element to hold all the cards
  const container = document.createElement("div");
  container.classList.add("card-container");

  // Loop through the cardData array
  for (let i = 0; i < cardData.length; i++) {
    // Get the current card object
    const card = cardData[i];

    // Create a div element for the card
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    // Set the card's title, image, description, and link
    cardElement.innerHTML = `
      <h2>${card.name}</h2>
      <img src="${card.image}" alt="${card.name}">
      <p>${card.city}</p>
      <p>${card.venue}</p>
      <p>${card.date}</p>
      
    `;

    // Add the card element to the container
    container.appendChild(cardElement);
  }

  // Return the container element
  return container;
}

const cards = getEvents("salt lake city").then(events => {
  const cardContainer = createCards(events);
  document.getElementById("cards").appendChild(cardContainer);
});




console.log(getEvents('Boston'));



function getWeather(cityName){
  const urlToFetch = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=26d0216d2bc1472b67d4b3e69210bfed`
  fetch(urlToFetch)
    .then(response => response.json())
    .then(jsonResponse => showWeather(jsonResponse));
}


const weather = getWeather('Boston');


// create show weather 

function showWeather(jsonResponse){
  const weather = jsonResponse.list[0].main.temp;
  const weatherContainer = document.getElementById('weather');
  weatherContainer.innerHTML = weather;
}


export { getEvents };