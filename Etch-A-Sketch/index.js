// populating html purely with js
const title = document.createElement('h1');
const body = document.querySelector('body');
const gridDiv = document.createElement('div');
const settings = document.createElement('div');

// TITLE
const addTitle = () => {
	title.textContent = 'Etch-a-Sketch';
	body.appendChild(title);
}

// GRID
const renderGrid = (col, row) => {
	gridDiv.id = 'grid';
	body.appendChild(gridDiv);
	
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
	const btns = ['resetGrid', 'setDimensions'];
	const btnNames = ['Reset', 'Set Dimensions']
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
}

// MAIN 
const main = async() => {
	let col = 16; //default
	let row = 16; //default

	try{
		await addTitle();
		await renderGrid(col,row);
		await renderButtons();

		// on hover + shift, grid background will change color
		const gridSpaces = document.querySelectorAll('.grid-space');
		gridSpaces.forEach(grid => grid.addEventListener('mouseover', (e) => {
		if (e.shiftKey) {
			grid.style.background = 'blue';
			}
		}));

		// reset grid
		const resetBtn = document.querySelector('#resetGrid');
		resetBtn.addEventListener('click', () => {
			gridSpaces.forEach(grid => grid.style.background = '#eee');
		});

		// form for new grid with dimensions col and row, limit 100
		const setDimensions = document.querySelector('#setDimensions');
		setDimensions.addEventListener('click', () => {
			alert(input('Columns:'));
			alert(input('Rows:'));
		});

		// rgb input value for square color

	}
	catch (err) {
		throw err;
	}
}

main();
