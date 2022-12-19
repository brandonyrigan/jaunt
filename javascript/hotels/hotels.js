function getData(apiURL, something) {
  return new Promise((resolve, reject) => {
    fetch(apiURL, something)
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
  const access_token = responseData.access_token;

  getHotelListByIataCode(access_token);
  console.log(access_token);

  return access_token;
};
getAmadeusKey();

const getHotelListByIataCode = async () => {
  const cityCode = "San";
  const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=30&radiusUnit=mile&ratings=2,3,4,5`;
  const bearerToken = "NW4aHcoJoDCOhctWH9ILDZBrNEaG";
  const getHotelOffers = [];

  const response = await getData(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    mode: "cors",
    catch: "default",
  })
    .then((response) => {
      const dataSliced = response.data.slice(0, 10);

      const firstHotelIdSliced = response.data[0].hotelId;
      console.log(firstHotelIdSliced);

      if (dataSliced) {
        for (const hotel of dataSliced.data) {
          console.log(hotel);
          // const hotelId = slicedResponse.data[0].hotelId;
          console.log("hotelId " + hotelId);
          const urlForHotelOffers = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}&adults=2`;

          const newResponse = getData(urlForHotelOffers, {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
            mode: "cors",
            catch: "default",
          });

          getHotelOffers.push(newResponse);
        }
      } else {
        throw new Error("some error");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
getHotelListByIataCode();
