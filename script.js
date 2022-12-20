import { getFlights } from "./javascript/flights/flights.js";
import { getHotelListByIataCode } from "./javascript/hotels/hotels.js";

//flights_tab.addEventListener("click", handleClick);

// function handleClick(event) {
//     console.log("click");
//     getFlights();
// }

tripForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  let cardContainer = document.createElement("div");
  cardContainer.className = "container";
  cardContainer.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img
                        src="https://robohash.org/trip"
                        class="img-fluid rounded-start"
                        alt="..."
                        width="200px"
                    />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${tripName.value}</h5>
                        <p class="card-text">
                            <span>${fromLocation.value}</span> - <span>${toLocation.value}</span>
                        </p>
                        <p class="card-text">
                            <span>${fromDate.value}</span> - <span>${toDate.value}</span>
                        </p>
                        <a href="#" class="btn btn-primary">See details</a>
                    </div>
                </div>
            </div>
        </div>
    `;

  tripContainer.appendChild(cardContainer);
  tripForm.reset();
});

myTab.addEventListener("click", (event) => {
  console.log(event);
  let parent = event.target.parentElement.parentElement;
  switch (event.target.innerText) {
    case "Flights":
      console.log("flights");
      for (let child of parent.children) {
        child.lastElementChild.classList.remove("focus");
      }
      event.target.classList.add("focus");
      break;
    case "Hotels":
      console.log("hotels");
      for (let child of parent.children) {
        child.lastElementChild.classList.remove("focus");
      }
      event.target.classList.add("focus");
      break;
    case "Events":
      console.log("events");
      for (let child of parent.children) {
        child.lastElementChild.classList.remove("focus");
      }
      event.target.classList.add("focus");
      break;
    case "Weather":
      console.log("weather");
      for (let child of parent.children) {
        child.lastElementChild.classList.remove("focus");
      }
      event.target.classList.add("focus");
      break;
    default:
      break;
  }
});
