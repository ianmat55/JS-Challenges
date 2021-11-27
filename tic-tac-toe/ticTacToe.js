// Gameboard object, player object, controller object
// pvp opion or AI option
// keep global variables to a minimum, make it cleaner than mr. clean
// rule of thumb: if you only need one of something, use a module, else use a factory
// Squid game theme

// IIFE to load base html
const loadHTML = (() => {
	const body = document.querySelector('body');

	// add main container to body
	const container = document.createElement('div');
	container.classList.add('container');
	body.appendChild(container);

	// add header 
	const header = document.createElement('div');
	header.setAttribute('id', 'header');
	const title = document.createElement('h1');
	title.innerHTML = 'Tic Tac Toe';
	header.appendChild(title);
	container.appendChild(header);

	// add start button
	const startBtn = document.createElement('button');
	startBtn.setAttribute('id', 'start');
	startBtn.classList.add('btn', 'btn-primary');
	startBtn.innerHTML = 'Play Game';
	const settingsDiv = document.createElement('div');
	settingsDiv.setAttribute('id', 'startGame');
	settingsDiv.appendChild(startBtn);
	container.appendChild(settingsDiv);

	// Listen for start button click
	startBtn.addEventListener('click', () => {
		const aiBtn = document.createElement('button');
		aiBtn.setAttribute('id', 'chooseAI');
		aiBtn.classList.add('btn', 'btn-primary');
		aiBtn.innerHTML = 'ai';
		const pvp = document.createElement('button');
		pvp.setAttribute('id', 'choosePlayer');
		pvp.classList.add('btn', 'btn-primary');
		pvp.innerHTML = 'player'

		startBtn.remove();
		settingsDiv.appendChild(aiBtn);
		settingsDiv.appendChild(pvp);

		aiBtn.addEventListener('click', async() => {
			await settingsDiv.remove();
			await displayController();
		});
	
		pvp.addEventListener('click', async() => {
			await settingsDiv.remove();
			await displayController();
		})
	});
})();

// IIFE since there is only one gameboard
const loadGameBoard = () => {
	const gameBoard = [];
	const container = document.querySelector('.container');
	const gameDiv = document.createElement('div');
	gameDiv.setAttribute('id', 'gameBoard');
	container.append(gameDiv);

	for (let i=0; i<9; i++) {
		const gridSquare = document.createElement('div');
		gridSquare.classList.add('gridSquare');
		gameDiv.appendChild(gridSquare);
	}

	const clear = () => {
		for (let i=0; i<gameBoard.length; i++) {
			gameBoard[i] = undefined;
		}

		const cells = document.querySelectorAll('.gridSquare');
		cells.forEach(cell => {
			// reset display logic
		});
	}

	// const setMove

	return { clear };
};

const displayController = async() => {
	await loadGameBoard();
	const cells = document.querySelectorAll('.gridSquare');
	cells.forEach(cell => {
		cell.addEventListener('click', () => {console.log('idk')});
	});

	// checks for wins
};


const player = (sign) => {
	const getSign = () => sign;

	return { getSign }
};

const UnbeatableComputer = (() => {

});