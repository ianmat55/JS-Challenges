import '../../dist/output.css';
import { updateUI } from './display.js';

const test = async() => {
	const update = await updateUI('New York');
	update.setBackground();
};

test();

const test2 = (e) => {
	e.preventDefault();
	let newLocation = document.querySelector('input');
	let location = newLocation.value;
	updateUI(location);
}

const searchBar = document.querySelector('form');
searchBar.addEventListener('submit', test2);