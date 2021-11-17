// populating html purely with js
const title = document.createElement('h1');
const directions = document.createElement('h3');
const body = document.querySelector('body');
const gridSection = document.createElement('div');
const gridDiv = document.createElement('div');
const settings = document.createElement('div');
const btnDropDown = document.createElement('div');

// TITLE
const addTitle = () => {
	title.textContent = 'Etch-a-Sketch';
	body.appendChild(title);
	directions.textContent = 'Hold shift and hover to draw';
	body.appendChild(directions);
}

// GRID
const renderGrid = (col, row) => {
	gridSection.id = 'section';
	gridDiv.id = 'grid';
	body.appendChild(gridSection);
	gridSection.appendChild(gridDiv);
	
	for(let i=0; i<(col*row); i++) {
		const gridBox = document.createElement('div');
		gridBox.style.border = '1px solid';
		gridDiv.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
		gridDiv.style.gridTemplateRows = `repeat(${col}, 1fr)`;
		gridDiv.appendChild(gridBox).setAttribute('class', 'grid-space')
	}
}

// BUTTONS
const renderButtons = () => {
	const btns = ['resetGrid', 'setDimensions', 'rgb', 'grayScale'];
	const btnNames = ['Reset', 'Set Dimensions', 'RGB', 'Gray-Scale'];

	for (let i=0; i<btns.length; i++) {
		let temp = document.createElement('button');
		temp.innerText = btnNames[i]
		temp.id = btns[i];
		temp.className = 'btn'
		temp.height = '200px';
		temp.width = '200px';
		settings.appendChild(temp);
	}

	settings.id = 'settings';
	body.appendChild(settings);

	// render grid button dropdown form
	// const form = document.createElement('form');
	// const inputCol = document.createElement('input');
	// const inputRow = document.createElement('input');
	// const submit = document.createElement('submit');
	// form.appendChild(inputCol);
	// form.appendChild(inputRow);
	// form.append(submit);
	// btnDropDown.appendChild(form);
	// btnDropDown.style.display = 'none';
}

// MAIN 
const main = async() => {
	let col = 16; //default
	let row = 16; //default
	let lineColor = 'blue';

	try{
		await addTitle();
		await renderButtons();
		await renderGrid(col,row);

		// on hover + shift, grid background will change color
		const gridSpaces = document.querySelectorAll('.grid-space');
		gridSpaces.forEach(grid => grid.addEventListener('mouseover', (e) => {
		if (e.shiftKey) {
			grid.style.background = lineColor;
			}
		}));

		// reset grid
		const resetBtn = document.querySelector('#resetGrid');
		resetBtn.addEventListener('click', () => {
			gridSpaces.forEach(grid => grid.style.background = '#eee');
		});

		// form for new grid with dimensions col and row, limit 100
		const setDimensions = document.querySelector('#setDimensions');
		setDimensions.addEventListener('click', async() => {
			let input = prompt('Enter Number for a x by x grid');
			await gridDiv.remove();
			if (parseInt(input) > 100 || parseInt(input) <= 0 ) {
				alert('Number must between 1 and 100');
			} else if (!parseInt(input)) {
				alert('Please enter a number');
			} else {
				col = row = Math.floor(input);
				alert(`${col} and ${row}`);
				renderGrid(col, row);
			}
		});

		// rgb input value for square color

	}
	catch (err) {
		throw err;
	}
}

main();
