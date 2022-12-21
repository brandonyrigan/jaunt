const baseurl = "https://app.ticketmaster.com/discovery/v2/events.json?";
const apikey = "Lb9duPQSfmOhyMAeBS88Dxum5ksUZAPO";

async function getEvents(cityName) {
	const urlToFetch = baseurl + "apikey=" + apikey + "&city=" + cityName;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			const events = jsonResponse._embedded.events;
			const eventsSet = new Set();
			const eventsSetArray = events.filter((event) => {
				const value = eventsSet.has(event.name);
				eventsSet.add(event.name);
				return !value;
			});
			const eventsArray = eventsSetArray.map((event) => {
				return {
					name: event.name,
					city: event._embedded.venues[0].city.name,
					image: event.images[0].url,
					venue: event._embedded.venues[0].name,
					date: event.dates.start.localDate,
					link: event.url,
				};
			});
			return eventsArray;
		}
	} catch (error) {
		console.log(error);
	}
}

async function createCards(cardData) {
	// Create a container element to hold all the cards
	const container = document.getElementById("events");
	const cardhtml = [];
	// Loop through the cardData array
	for (let i = 0; i < 6; i++) {
		// Get the current card object
		const card = cardData[i];

		// Set the card's title, image, description, and link
		cardhtml.push(`
<div class="card" style="width: 18rem;">
  <img src="${card.image}" class="card-img-top" alt="${card.name}">
  <div class="card-body">
    <h5 class="card-title">${card.name}</h5>
    <p class="card-text">${card.city}</p>
    <p class="card-text">${card.venue}</p>
    <p class="card-text">${card.date}</p>
    
  </div>
  <a href="${card.link}" class="btn btn-success mb-3" target="_blank">Buy Tickets</a>
</div>
`);

		// Add the card element to the container
		container.innerHTML = cardhtml.join(" ");
	}

	// Return the container element
	return container;
}

// create another function by combining the two functions above

export { getEvents, createCards };
