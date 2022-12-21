// import { getPhoto } from "../photos/photo";

const getAmadeusKey = async (tripDetails) => {
  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "ADnbofc7M6Z8Zq8iBHx8qQ9OURzRjC4p",
    client_secret: "8PCma3oKwtCV4L8P",
  });

  const response = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    }
  );

  const responseData = await response.json();
  const access_token = await responseData.access_token;
  const tripInfo = tripDetails;
  getHotelListByIataCode(access_token, tripInfo);
};

function getData(apiURL, optionsObject) {
  return new Promise((resolve, reject) => {
    fetch(apiURL, optionsObject)
      .then((response) => {
        return response.json();
      })
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
}

const getHotelListByIataCode = async (token, tripDetails) => {
  console.log(tripDetails);
  const cityCode = tripDetails.fromLocation;
  const numberOfAdults = tripDetails.numberOfAdults;
  const radius = "30";
  const rating = "4";
  const checkIn = tripDetails.fromDate;
  const checkOut = tripDetails.toDate;
  const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=${radius}&radiusUnit=mile&ratings=${rating}`;
  const bearerToken = `${token}`;

  const hotelListByCityResponse = await getData(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    mode: "cors",
    catch: "default",
  })
    .then(async (response) => {
      const dataSliced = response.data.slice(0, 10);
      if (dataSliced) {
        for (const hotel of dataSliced) {
          const hotelId = hotel.hotelId;
          const urlForHotelOffers = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}&adults=${numberOfAdults}`;
          const hotelOffersResponse = await getData(urlForHotelOffers, {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
            mode: "cors",
            catch: "default",
          })
            .then((response) => showHotel(response))
            .catch((error) => console.log(error));
        }
      } else {
        throw new Error("some error");
      }
    })
    .catch((error) => console.log(error));
};

// const getIataBySearch = async (token) => {
//   const searchTerm = `San`;
//   const countryCode = `US`;
//   const subType = `CITY,AIRPORT`;
//   const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=${subType}&keyword=${searchTerm}&countryCode=${countryCode}`;
//   const bearerToken = `${token}`;

//   const response = await getData(url, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${bearerToken}`,
//     },
//     mode: "cors",
//     catch: "default",
//   })
//     .then(async (response) => {
//       console.log(response);
//     })
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error));
// };

function showHotel(data) {
  const hotelDetails = data.data[0];
  const hotelPriceDetails = data.data[0].offers[0];
  console.log(hotelDetails);
  console.log(hotelPriceDetails);
  const tableRow = document.createElement("tr");
  const hotelName = document.createElement("td");
  const hotelRoomDetails = document.createElement("td");
  const hotelPrice = document.createElement("td");
  const detailsButton = document.createElement("button");

  hotelName.innerText = `${hotelDetails.hotel.name}`;
  hotelName.setAttribute;
  hotelRoomDetails.innerText = `${hotelPriceDetails.room.typeEstimated.bedType}`;
  hotelPrice.innerText = `${hotelPriceDetails.price.base}`;

  hotelName.onclick = function () {
    // getPhoto(hotelname);
    const modalElement = document.createElement("div");
    modalElement.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="card" style="width: 18rem;">
      {/* <img src="..." class="card-img-top" alt="..."/> */}
      <div class="card-body">
        <h5 class="card-title">${hotelDetails.hotel.name}</h5>
        <p class="card-text">Check-In: ${hotelPriceDetails.checkInDate}</p>
        <p class="card-text">Check-Out: ${hotelPriceDetails.checkOutDate}</p>
        <button
          type="button"
          class="btn-close"
          data-mdb-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
  `;
  };

  tableRow.appendChild(hotelName);
  tableRow.appendChild(hotelRoomDetails);
  tableRow.appendChild(hotelPrice);
  hotelTableBody.appendChild(tableRow);
}

export { getAmadeusKey };
