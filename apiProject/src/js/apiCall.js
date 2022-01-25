// process.env.apiKEY
async function getWeather(city, key) {
	const call = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
	const response = await fetch(call);
	return response.json();
}

export { getWeather }
