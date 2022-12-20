tripForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);
    let cardContainer = document.createElement("div");
    cardContainer.className = "card mb-3";
    cardContainer.style.width = "80%";
    cardContainer.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img
                        src="https://robohash.org/trip"
                        class="img-fluid rounded-start"
                        alt="..."
                    />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 id="tripNameCard" class="card-title">${tripName.value}</h5>
                        <p class="card-text">
                            <span id="tripFromCard">${fromLocation.value}</span> - <span id="tripToCard">${toLocation.value}</span>
                        </p>
                        <p class="card-text">
                            <span id="tripStartDateCard">${fromDate.value}</span> - <span id="tripEndDateCard">${toDate.value}</span>
                        </p>
                        <a href="./tripdetails.html" class="btn btn-primary" target="_blank">See details</a>
                    </div>
                </div>
            </div>
    `;

    tripContainer.appendChild(cardContainer);

    tripContainer.addEventListener("click", (event) => {
        if (event.target.innerText === "See details") {
            let parent = event.target.parentElement;
            let tripName = parent.children[0].innerText;
            let fromLocation = parent.children[1].children[0].innerText;
            let toLocation = parent.children[1].children[1].innerText;
            let startDate = parent.children[2].children[0].innerText;
            let endDate = parent.children[2].children[1].innerText;

            localStorage.setItem("tripName", tripName);
            localStorage.setItem("fromLocation", fromLocation);
            localStorage.setItem("toLocation", toLocation);
            localStorage.setItem("startDate", startDate);
            localStorage.setItem("endDate", endDate);
        }
    });

    tripForm.reset();
});
