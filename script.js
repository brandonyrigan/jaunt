import { getFlights } from "./javascript/flights/flights.js";

//flights_tab.addEventListener("click", handleClick);

// function handleClick(event) {
//     console.log("click");
//     getFlights();
// }

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
