import { UNSPLASH_API_KEY } from "../api_keys/keys.js";

function getPhoto(userInput) {
	const apiUrl = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&query=${userInput}&orientation=squarish`;

	return new Promise((resolve, reject) => {
		fetch(apiUrl)
			.then((res) => resolve(res.json()))
			.catch((err) => reject(err));
	});
}

export { getPhoto };
