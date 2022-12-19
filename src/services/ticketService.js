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

export { getEvents };