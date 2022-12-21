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
	const cityCode = tripDetails.toLocation;
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
			const dataSliced = response.data.slice(0, 20);
			if (dataSliced) {
				for (const hotel of dataSliced) {
					const hotelId = hotel.hotelId;
					const urlForHotelOffers = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}&adults=${numberOfAdults}`;
					const hotelOffersResponse = await getData(
						urlForHotelOffers,
						{
							method: "GET",
							headers: {
								Accept: "application/json",
								Authorization: `Bearer ${bearerToken}`,
							},
							mode: "cors",
							catch: "default",
							timeout: 6000,
						}
					)
						.then(async (response) => await showHotel(response))
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
	console.log(data);
	const hotelDetails = data.data[0];
	console.log(hotelDetails);
	const hotelPriceDetails = data.data[0].offers[0];

	let lat = hotelDetails.hotel.latitude;
	let long = hotelDetails.hotel.longitude;
	const key = `AIzaSyB0t_edILTp-9mg21S96kQ5ffGurDB9eAI`;
	let url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=16&size=400x400&key=${key}`;

	const tableRow = document.createElement("tr");
	const hotelName = document.createElement("td");
	const hotelRoomDetails = document.createElement("td");
	const hotelPrice = document.createElement("td");
	const mapButton = document.createElement("td");
	const mapImage = document.createElement("img");

	mapImage.setAttribute("src", url);
	modalBody.innerHTML = `<img src="${url}" alt="mapImage"/>`;
	hotelName.innerText = `${hotelDetails.hotel.name}`;
	hotelName.setAttribute;
	hotelRoomDetails.innerText = `${hotelPriceDetails.room.typeEstimated.bedType}`;
	hotelPrice.innerText = `${hotelPriceDetails.price.base}`;
	mapButton.innerHTML = `
  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Map
  </button> `;

	tableRow.appendChild(hotelName);
	tableRow.appendChild(hotelRoomDetails);
	tableRow.appendChild(hotelPrice);
	tableRow.appendChild(mapButton);
	hotelTableBody.appendChild(tableRow);
}

export { getAmadeusKey };
