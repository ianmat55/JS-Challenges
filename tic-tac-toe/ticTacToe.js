// Gameboard object, player object, controller object
// pvp opion or AI option
// keep global variables to a minimum, make it cleaner than mr. clean
// rule of thumb: if you only need one of something, use a module, else use a factory
// Squid game theme


// TODO: ADD SCORING SYSTEM

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

		// vs ROBOT
		aiBtn.addEventListener('click', () => {
			settingsDiv.remove();
			const player1 = player('X');
			const bot = unbeatableComputer('O');
			const display = displayController(player1, bot);
			let grid = display.getGrid();
	
			loadGameBoard();

			const cells = document.querySelectorAll('.gridSquare');
			const resetBtn = document.querySelector('.btn-danger');

			// player move
			let  playerMove = (cell, index) => { 
				cell.innerHTML = 'X';
				grid[index] = 'X';
				cell.classList.add('green');
				currentPlayer = 'O';
			};

			cells.forEach((cell, index) => {
				cell.addEventListener('click', async() => {
					if (grid[index] === 'X' || grid[index] === 'O') { // if cell already selected, exit
						return
					} else {
						playerMove(cell, index);
						if (display.checkWin(grid)) {
							return
						};

						bot.dumbMove(grid); 
						if (display.checkWin(grid)) {
							return;
						}
						grid = display.getGrid();

						// testing minimax, remove once done
						bot.miniMax(grid);
						////////////////////////////////////
		
					}
				});
			});

			resetBtn.addEventListener('click', () => display.clear());

		});
		
		// vs PLAYER
		pvp.addEventListener('click', () => {
			settingsDiv.remove();
			const player1 = player('X');
			const player2 = player('O');
			const display = displayController(player1, player2);

			loadGameBoard();

			const cells = document.querySelectorAll('.gridSquare');
			const resetBtn = document.querySelector('.btn-danger');

			// How does forEach know what to assign each parameter? How does it magically know the index?
			cells.forEach((cell, index) => {
				cell.addEventListener('click', () => display.displayMove(cell, index));
			});

			resetBtn.addEventListener('click', () => display.clear());
		});
	});
})();

const loadGameBoard = () => {
	const container = document.querySelector('.container');

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

	return { loadBoard, resetButton };
};


// Where the game logic happens
const displayController = (p1, p2) => {
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
		[0, 4, 8]
	];

	let currentPlayer = 'X';
	let gameActive = true;
	let count = 0;
	
	// to be refactored
	const checkWin = (grid) => {
		count++;
		for (let i=0; i<winningConditions.length; i++) {
			if (grid[winningConditions[i][0]] === "X" && grid[winningConditions[i][1]] === "X" && grid[winningConditions[i][2]] === "X") {
				displayWinner('X');
				return true;
			};
			if (grid[winningConditions[i][0]] === "O" && grid[winningConditions[i][1]] === "O" && grid[winningConditions[i][2]] === "O") {
				displayWinner('O');
				return true;
			}
		};
		if (count === 9) {
			console.log(count);
			displayWinner(null);
		}
		return false;
	};

	const displayWinner = (symbol) => {
		const body = document.querySelector('body');

		// create winnerMsg
		const winnerMsg = document.createElement('div');
		winnerMsg.setAttribute('id', 'winner-container');
		const winner = document.createElement('h1');
		winner.setAttribute('id', 'winner-msg');

		// check if tie
		if (symbol === null) {
			winner.innerHTML = 'Its a tie!';
		} else {
			winner.innerHTML = `${symbol} wins!`
		}
		winnerMsg.appendChild(winner);

		// div for btns
		const buttonsDiv = document.createElement('div');
		buttonsDiv.setAttribute('id', 'restart-return');

		// restart btn
		const restartBtn = document.createElement('button');
		restartBtn.classList.add('btn', 'btn-primary');
		restartBtn.innerHTML = 'Restart';
		buttonsDiv.appendChild(restartBtn);

		// return to title btn
		const returnToTitle = document.createElement('button');
		returnToTitle.classList.add('btn', 'btn-warning');
		returnToTitle.innerHTML = 'Exit';
		buttonsDiv.appendChild(returnToTitle);

		winnerMsg.appendChild(buttonsDiv);

		body.appendChild(winnerMsg);

		restartBtn.addEventListener('click', () => {
			winnerMsg.remove();
			clear();		
		});

		returnToTitle.addEventListener('click', () => {
			location.reload();
		});
	};

	const displayMove = async(cell, index) => {
		if (grid[index] != '') {
			return
		}
		cell.innerHTML = currentPlayer;
		grid[index] = currentPlayer;
		checkWin(grid);

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
		currentPlayer = 'X';
		count = 0;
		for (let i=0; i<grid.length; i++) {
			grid[i] = '';
		}

		const cells = document.querySelectorAll('.gridSquare');
		cells.forEach(cell => {
			cell.innerHTML = "";
			cell.className = 'gridSquare';
		});
	};

	// display player/bot cards
	const displayCards = (() => {
		const container = document.querySelector('.container');
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

	const getGrid = () => {
		return grid;
	};

	const updateGrid = (newGrid) => {
		grid = newGrid;
	}

	const getCurrentPlayer = () => {
		return currentPlayer;
	};

	const updatePlayer = (newCurrentPlayer) => {
		currentPlayer = newCurrentPlayer;
	}

	const isActive = () => {
		return gameActive;
	};

	return { getCurrentPlayer, updatePlayer, isActive, clear, displayMove, checkWin, displayWinner, getGrid, updateGrid };
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

	const human = 'X';
	const bot = 'O';
	
	const getSign = () => sign;
	
	const displayCard = () => {
		return 'Robot'
	};

	const miniMax = (newGrid, player) => {
		// results in either a win or a draw

		let possibleChoices = checkPossibleChoices(newGrid);

		// return val if terminal state is found (+10, 0; -10)
		if (checkState(newGrid, human)) {
			return {
				score: -10
			};
		} else if (checkState(newGrid, bot)) {
			return {
				score: 10
			};
		} else if (possibleChoices === null) {
			return {
				score: 0
			};
		}

		let moves = [];

		// go through available spots on the board
		for (let i = 0; i < possibleChoices.length; i++) {
			let move = {};
			move.index = newGrid[possibleChoices[i]];
			newGrid[possibleChoices[i]] = player;
		
		
		// call the minimax function on each available spot (recursion)
			if (player == bot) {
			  let g = minimax(newBoard, human);
			  move.score = g.score;
			} else {
			  let g = minimax(newBoard, bot);
			  move.score = g.score;
			}
			newGrid[possibleChoices[i]] = move.index;
			moves.push(move);
		  }

		// evaluate returning values from function calls
		let bestMove;
		if (player === bot) {
			let bestScore = -10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			};
		} else {
			let bestScore = 10000;
			for (var i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			};
		}
		return moves[bestMove]; // return best value
	};

	const checkPossibleChoices = (newGrid) => {
		let possibleChoices = [];

		for (let i=0; i<newGrid.length; i++) {
			if (newGrid[i] == "") {
				possibleChoices.push(i);
			}
		};

		if (possibleChoices.length > 0) {
			return possibleChoices;
		} else {
			return null;
		}
	};

	const checkState = async(newGrid, player) => {
		const winningConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[2, 4, 6],
			[0, 4, 8]
		];

		for (let i=0; i<winningConditions.length; i++) {
			if (newGrid[winningConditions[i][0]] === player && newGrid[winningConditions[i][1]] === player && newGrid[winningConditions[i][2]] === player) {
				return true;
			}
		};

		return false;
	};

	const chooseDumbMove = (newGrid) => {
		let possibleChoices = checkPossibleChoices(newGrid);
		console.log(possibleChoices);
		if(possibleChoices === null) {
			return 
		}

		let randomIndex = Math.floor(Math.random() * possibleChoices.length);
		let chosenMove = possibleChoices[randomIndex];
		possibleChoices.splice(randomIndex, 1);

		return chosenMove;
	};

	const dumbMove = (newGrid) => {
		const cells = document.querySelectorAll('.gridSquare');
	
		let botMove = chooseDumbMove(newGrid);
		let chosenCell = cells[botMove];

		chosenCell.innerHTML = 'O';
		chosenCell.classList.add('pink');

		newGrid[botMove] = 'O';
		setGrid(newGrid);
	};

	const setGrid = (newGrid) => {
		return newGrid;
	} 

	return { chooseDumbMove, dumbMove, displayCard, getSign, setGrid, miniMax }
};