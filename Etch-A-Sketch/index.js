// populating html purely with js
const title = document.createElement('h1');
const directions = document.createElement('h3');
const body = document.querySelector('body');
const gridSection = document.createElement('div');
const gridDiv = document.createElement('div');
const settings = document.createElement('div');
const btnDropDown = document.createElement('div');
let lineColor = 'blue';

// TITLE
const addTitle = () => {
	title.textContent = 'Etch-a-Sketch';
	body.appendChild(title);
	directions.textContent = 'Hold shift and hover to draw';
	body.appendChild(directions);
}

// GRID
const createDivs = (col, row) => {
	for(let i=0; i<(col*row); i++) {
		const gridBox = document.createElement('div');
		gridBox.style.border = '1px solid';
		gridDiv.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
		gridDiv.style.gridTemplateRows = `repeat(${col}, 1fr)`;
		gridDiv.appendChild(gridBox).setAttribute('class', 'grid-space')
	}
};

const renderGrid = (col, row) => {
	gridSection.id = 'section';
	gridDiv.id = 'grid';
	body.appendChild(gridSection);
	gridSection.appendChild(gridDiv);
	createDivs(col, row);
};

const gridRedraw = async(newCol, newRow) => {
	const gridSpaces = document.querySelectorAll('.grid-space');
	await gridSpaces.forEach(space => space.remove());
	createDivs(newCol, newRow);
	resetGridBtn();
	colorGrid(lineColor);
};

// Color Grid
const colorGrid = (lineColor) => {
	const gridSpaces = document.querySelectorAll('.grid-space');
	gridSpaces.forEach(grid => grid.addEventListener('mouseover', (e) => {
	if (e.shiftKey) {
		grid.style.background = lineColor;
		}
	}));
};

// BUTTONS
const renderButtons = () => {
	const btns = ['resetGrid', 'setDimensions', 'rgb', 'grayScale'];
	const btnNames = ['Reset', 'Set Dimensions', 'RGB', 'Gray-Scale'];

	for (let i=0; i<btns.length; i++) {
		let temp = document.createElement('button');
		temp.innerText = btnNames[i]
		temp.id = btns[i];
		temp.className = 'btn btn-primary';
		temp.height = '200px';
		temp.width = '200px';
		settings.appendChild(temp);
	}

	settings.id = 'settings';
	body.appendChild(settings);
};

const setDimensionsBtn = () => {
	document.querySelector('#setDimensions');
	setDimensions.addEventListener('click', async() => {
	let input = prompt('Enter Number for a x by x grid');
	if (parseInt(input) > 100 || parseInt(input) <= 0 ) {
		alert('Number must between 1 and 100');
	} else if (!parseInt(input)) {
		alert('Please enter a number');
	} else {
		col = row = Math.floor(input);
		gridRedraw(col, row);
	}
	});
};

const resetGridBtn = () => {
	const gridSpaces = document.querySelectorAll('.grid-space');
	const resetBtn = document.querySelector('#resetGrid');
	resetBtn.addEventListener('click', () => {
	gridSpaces.forEach(grid => grid.style.background = 'white');
	});
};

// MAIN 
const main = async() => {
	try{

		let col = 16; //default
		let row = 16; //default
		// let lineColor = 'blue';
		
		await addTitle();
		await renderButtons();
		await renderGrid(col,row);

		// Event Listeners
		resetGridBtn();

		// form for new grid with dimensions col and row, limit 100
		setDimensionsBtn();

		// on hover + shift, grid background will change color
		colorGrid(lineColor);
		
		// rgb input value for square color

	}
	catch (err) {
		throw err;
	}
};

main();
