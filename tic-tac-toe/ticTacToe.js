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
			const player1 = player('X');
			const bot = unbeatableComputer('O');

			await settingsDiv.remove();
			await loadGameBoard(player1, bot);
			await displayController();
		});
	
		pvp.addEventListener('click', async() => {
			const player1 = player('X');
			const player2 = player('O');

			await settingsDiv.remove();
			await loadGameBoard(player1, player2);
			await displayController();
		})
	});
})();

// IIFE since there is only one gameboard
const loadGameBoard = (p1, p2) => {
	const container = document.querySelector('.container');

	// display player/bot cards
	const displayCards = (() => {
		const card1 = p1.displayCard();
		const card2 = p2.displayCard();

		const playerCards = document.createElement('div');
		playerCards.setAttribute('id', 'playerCards');
		const player1 = document.createElement('div');
		const player2 = document.createElement('div');

		playerSymbol1 = document.createElement('h2');
		playerSymbol1.innerHTML = p1.getSign();
		player1.appendChild(playerSymbol1);
		playerName1 = document.createElement('h3');
		playerName1.innerHTML = `Player ${card1}`;
		player1.appendChild(playerName1);
		player1.classList.add('player');
		playerCards.appendChild(player1);

		playerName2 = document.createElement('h3');
		if (card2 != 'Robot') {
			playerName2.innerHTML = `Player ${card2}`
			player2.classList.add('player');
		} else {
			playerName2.innerHTML = card2;
			player2.classList.add('bot')
		}
		playerSymbol2 = document.createElement('h2');
		playerSymbol2.innerHTML = p2.getSign();
		player2.appendChild(playerSymbol2);
		player2.appendChild(playerName2);
		playerCards.appendChild(player2);

		container.appendChild(playerCards);
	})();

	// load game board
	const loadBoard = (() => {
		const gameDiv = document.createElement('div');
		gameDiv.setAttribute('id', 'gameBoard');
		container.appendChild(gameDiv);

		for (let i=0; i<9; i++) {
			const gridSquare = document.createElement('div');
			gridSquare.classList.add('gridSquare');
			gameDiv.appendChild(gridSquare);
		}
	})();

	// load reset button
	const resetButton = (() => {	
		const resetDisplay = document.createElement('div');
		resetDisplay.setAttribute('id', 'resetSettings');
		container.appendChild(resetDisplay);
		const resetButton = document.createElement('button');
		resetButton.classList.add('btn', 'btn-danger');
		resetButton.innerHTML = 'Reset';
		resetDisplay.appendChild(resetButton);
	})();

	return { displayCards, loadBoard, resetButton };
};


// Where the game logic happens
const displayController = () => {
	let grid = [
		'', '', '',
		'', '', '',
		'', '', ''
	];

	/*
		[0] [1] [2]
		[3] [4] [5]
		[6] [7] [8]
	*/

	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[0, 4, 1]
	];

	let currentPlayer = 'X';
	let gameActive = true;
	const cells = document.querySelectorAll('.gridSquare');
	const resetBtn = document.querySelector('.btn-danger');
	
	// to be refactored
	const checkWin = () => {
		for (let i=0; i<winningConditions.length; i++) {
			if (grid[winningConditions[i][0]] === "X" && grid[winningConditions[i][0]] === "X" && grid[winningConditions[i][0]] === "X") {
				console.log('FUCK YEA');
			};
			if (grid[winningConditions[i][0]] === "O" && grid[winningConditions[i][0]] === "O" && grid[winningConditions[i][0]] === "O") {
				console.log('FUCK YEA');
			}
		};
	};

	// const checkArrEqual = (arr1, arr2) => {
	// 	if (arr1 === arr2) {
	// 		return true;
	// 	}
	// 	if (arr1.length != arr2.length) {
	// 		return false;
	// 	};

	// 	for (let i=0; i<arr1.length; i++) {
	// 		if (arr1[i] != arr2[i]) {
	// 			return false;
	// 		}
	// 	};

	// 	return true;
	// };

	const displayMove = async(cell, index) => {
		if (grid[index] != '') {
			return
		}
		cell.innerHTML = currentPlayer;
		grid[index] = currentPlayer;
		checkWin();

		if (currentPlayer == 'X') {
			// set color to green and change currentPlayer to O
			cell.classList.add('green');
			currentPlayer = 'O';
		} else if (currentPlayer == 'O') {
			// set color to pink and change currentPlayer to X
			cell.classList.add('pink');
			currentPlayer = 'X';
		}
	};

	const clear = () => {
		for (let i=0; i<grid.length; i++) {
			grid[i] = '';
		}

		const cells = document.querySelectorAll('.gridSquare');
		cells.forEach(cell => {
			cell.innerHTML = "";
			cell.className = 'gridSquare';
		});
	};

	// How does forEach know what to assign each parameter? How does it magically know the index?
	cells.forEach((cell, index) => {
		cell.addEventListener('click', () => displayMove(cell, index));
	});

	resetBtn.addEventListener('click', () => clear());

	return { grid, currentPlayer, gameActive, clear, displayMove, checkWin };
};

const player = (sign) => {
	const getSign = () => sign;

	const getRandom = (max) => {
		return Math.floor(Math.random() * max)
	}

	const displayCard = () => {
		const numberOfPlayers = getRandom(456) // number of squid game players

		return numberOfPlayers
	}

	return { getSign, displayCard }
};

const unbeatableComputer = (sign) => {
	const getSign = () => sign;
	
	const displayCard = () => {
		return 'Robot'
	}

	return { displayCard, getSign }
};