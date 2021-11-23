// populating html purely with js just for fun
const title = document.createElement('h1');
const directions = document.createElement('p');
const body = document.querySelector('body');
const gridSection = document.createElement('div');
const gridDiv = document.createElement('div');
const settings = document.createElement('div');
const btnDropDown = document.createElement('div');
const gridSpaces = document.querySelectorAll('.grid-space');

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
		// gridBox.style.border = '1px solid';
		gridDiv.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
		gridDiv.style.gridTemplateRows = `repeat(${col}, 1fr)`;
		gridDiv.appendChild(gridBox).setAttribute('class', 'grid-space')
	}
};

const renderGrid = (col, row) => {
	gridSection.id = 'section';
	gridSection.style.overflow = 'hidden';
	// gridSection.style.maxHeight = '70vh';
	gridSection.className = 'container';
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
	rgbBtn();
	grayScaleBtn();
	colorGrid();
};

// Color Grid
const colorGrid = () => {
	const gridSpaces = document.querySelectorAll('.grid-space');
	gridSpaces.forEach(grid => grid.addEventListener('mouseover', () => {
		grid.style.background = 'blue';
	}));
}

const rgb = () => {
	let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let rgb = `rgb(${r},${g},${b})`;
	return rgb;
}

const rgbBtn = () => {
	const rgbBtn = document.querySelector('#rgb');
	const gridSpaces = document.querySelectorAll('.grid-space');
	rgbBtn.addEventListener('click', () => {
		gridSpaces.forEach(grid => grid.addEventListener('mouseover', (e) => {
			let color = rgb();
			grid.style.background = color;
		}))
	})
};

const grayScale = () => {
	let val = (Math.random()*(256)|0).toString(16);//bitwise OR. Gives value in the range 0-255 which is then converted to base 16 (hex).
	let scale =  "#" + val + val + val;
	return scale;
};

const grayScaleBtn = () => {
	const gridSpaces = document.querySelectorAll('.grid-space');
	const grayScaleBtn = document.querySelector('#grayScale');
	grayScaleBtn.addEventListener('click', () => {
		gridSpaces.forEach(grid => grid.addEventListener('mouseover', () => {
			let color = grayScale();
			grid.style.background = color;
		}))
	})
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
		
		await addTitle();
		await renderButtons();
		await renderGrid(col,row);

		// Event Listeners
		resetGridBtn();

		// form for new grid with dimensions col and row, limit 100
		setDimensionsBtn();

		// set line color
		rgbBtn();
		grayScaleBtn();
		colorGrid();
		
	}
	catch (err) {
		throw err;
	}
};

main();
