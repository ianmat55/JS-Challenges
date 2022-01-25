import { getWeather } from './apiCall';

const updateUI = async(location) => {

	const res = await getWeather(location, process.env.apiKEY);

	const city = document.querySelector('#location');
	city.innerHTML = res.name;

	const currentTemp = document.querySelector('#current-temp');
	const farenheit = Math.round((9/5)*(res.main.temp - 273) + 32);
	currentTemp.innerHTML = farenheit;

	const condition = document.querySelector('#weather');
	condition.innerHTML = res.weather[0].description;

	const icon = document.querySelector('#icon');
	let source = `http://openweathermap.org/img/wn/${res.weather[0].icon}.png`;
	icon.src = source;

	async function setBackground() {
		let time = await getTime();
		const body = document.querySelector('body');
		if (time === 'night') {
			body.style.backgroundImage = "url('../src/assets/02.jpg')";
		} else {
			// const conditions = {1:['clear sky', 'few clouds'], 3:['scattered clouds', 'broken clouds'], 5:'shower rain', 6:['rain', 'thunderstorm'], 8:'snow', 9:'mist'};
			// add more detail later

			body.style.backgroundImage = "url('../src/assets/03.jpg')";
		}
	};

	function getTime() {
		const morning = 6;
		const noon = 12;
		const evening = 18;
		const night = 20;
		const hour = new Date().getHours();

		if (hour>=morning && hour<noon) {
			return 'morning';
		} else if (hour>=noon && hour<evening) {
			return 'noon';
		} else if (hour>=evening && hour<night) {
			return 'evening';
		} else {
			return 'night';
		}
	};

	return { setBackground }
};

export { updateUI };
