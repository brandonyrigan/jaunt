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

const getAmadeusKey = async () => {
  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "l6lEjdKwsGuvhLUcpPYs5p3UXakFhtiE",
    client_secret: "lVj4RPAosldSESTM",
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

  getHotelListByIataCode(access_token);
  console.log(access_token);

  return access_token;
};

const getHotelListByIataCode = async (token) => {
  const cityCode = "San";
  const numberOfAdults = "2";
  const radius = "30";
  const rating = "4";
  const checkIn = "";
  const checkOut = "";
  const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=${radius}&radiusUnit=mile&ratings=${rating}`;
  const bearerToken = `${token}`;

  const response = await getData(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    mode: "cors",
    catch: "default",
  })
    .then(async (response) => {
      const dataSliced = response.data.slice(0, 3);
      if (dataSliced) {
        for (const hotel of dataSliced) {
          const hotelId = hotel.hotelId;
          const urlForHotelOffers = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}&adults=${numberOfAdults}`;
          const newResponse = await getData(urlForHotelOffers, {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
            mode: "cors",
            catch: "default",
          });
        }
      } else {
        throw new Error("some error");
      }
    })
    .then((response) => {
      console.log(response);
    })
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(error);
    });
};

const getIataBySearch = async (token) => {
  const searchTerm = `San`;
  const countryCode = `US`;
  const subType = `CITY,AIRPORT`;
  const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=${subType}&keyword=${searchTerm}&countryCode=${countryCode}`;
  const bearerToken = `${token}`;

  const response = await getData(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    mode: "cors",
    catch: "default",
  })
    .then(async (response) => {
      console.log(response);
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};

getAmadeusKey();
