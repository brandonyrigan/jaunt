import { getPhoto } from "./javascript/photos/photo.js";
import { getCurrentWeather } from "./javascript/weather/weather.js";
import { getCity } from "./javascript/helper/helpers.js";

tripForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const city = await getCity(toLocation.value);

	Promise.all([getPhoto(tripName.value), getCurrentWeather(city)])
		.then((json) => {
			let cardContainer = document.createElement("div");
			cardContainer.className = "card mb-3";

			cardContainer.innerHTML = `
			        <div class="row g-0">
			            <div class="col-md-4">
			                <img
			                    src="${json[0].urls.small}"
			                    class="img-fluid rounded-start"
			                    alt="${tripName.value}"
                                width="200px"
			                />
			            </div>
			            <div class="col-md-7">
                    <div class="card-body">
                        <h5 id="tripNameCard" class="card-title">${tripName.value}</h5>
                        <p class="card-text">
                            <span id="tripFromCard">${fromLocation.value}</span> to <span id="tripToCard">${toLocation.value}</span>
                        </p>
                        <p class="card-text">
                            <span id="tripStartDateCard">${startDate.value}</span> - <span id="tripEndDateCard">${endDate.value}</span>
                        </p>
                        <a href="./tripdetails.html" class="btn btn-success" target="_blank">See details</a>
                    </div>
			            </div>
                  <div class="col-md-1">
                    <p class="card-text">
                      <img src="http://openweathermap.org/img/w/${json[1].weather[0].icon}.png" alt="weather icon">
			                <span id="currentWeather">${json[1].main.temp}</span>
			              </p>
							      <p class="card-test">Adults: <span>${numberOfAdults.value}</span></p>
                  </div>
			        </div>
			`;

			tripContainer.appendChild(cardContainer);

			tripForm.reset();
		})
		.catch((err) => console.log(err));

	tripContainer.addEventListener("click", (event) => {
		if (event.target.innerText === "See details") {
			let parent = event.target.parentElement;
			let tripName = parent.children[0].innerText;
			let fromLocation = parent.children[1].children[0].innerText;
			let toLocation = parent.children[1].children[1].innerText;
			let startDate = parent.children[2].children[0].innerText;
			let endDate = parent.children[2].children[1].innerText;
			let numberOfAdults =
				parent.parentElement.parentElement.children[2].children[1]
					.children[0].innerText;

			localStorage.setItem("tripName", tripName);
			localStorage.setItem("fromLocation", fromLocation);
			localStorage.setItem("toLocation", toLocation);
			localStorage.setItem("startDate", startDate);
			localStorage.setItem("endDate", endDate);
			localStorage.setItem("numberOfAdults", numberOfAdults);
		}
	});
});
