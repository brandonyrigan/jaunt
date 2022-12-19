const baseurl = 'https://app.ticketmaster.com/discovery/v2/events.json?';
const apikey = 'Lb9duPQSfmOhyMAeBS88Dxum5ksUZAPO';



function getEvents(cityName) {
  const urlToFetch = baseurl + 'apikey=' + apikey + '&city=' + cityName;
  return new Promise((resolve, reject) => {
    fetch(urlToFetch)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            resolve(json);
        })
        .catch((err) => reject(err));
})
}

export { getEvents };