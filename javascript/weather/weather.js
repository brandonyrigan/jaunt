API_KEY = "26d0216d2bc1472b67d4b3e69210bfed";

function getWeather(cityName) {
    const urlToFetch = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${API_KEY}&units=imperial`;
    fetch(urlToFetch)
        .then((response) => response.json())
        .then((jsonResponse) => showWeather(jsonResponse));
}

// show four day forecast in a single div img and temp for each day
function showWeather(jsonResponse) {
    const weatherDiv = document.getElementById("weather");
    const weather = jsonResponse.list;
    const weatherHTML = [];
    for (let i = 0; i < weather.length; i += 8) {
        weatherHTML.push(`
      <div class="weather-day">
        <p>${weather[i].dt_txt.slice(5, 10)}</p>
        <img src="http://openweathermap.org/img/w/${
            weather[i].weather[0].icon
        }.png" alt="weather icon">
        <p>${weather[i].main.temp}°F</p>
      </div>
    `);
    }
    weatherDiv.innerHTML = weatherHTML.join("");
}

export { getWeather };
