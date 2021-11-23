// User selects rock, rock paper or scissors. Computer selects rock, paper or scissors. 
// Keeps track of wins/losses
// cool animation

let playerCount = 0;
let compCount = 0;
const jonKenPo = ['rock', 'paper', 'scissors']

const getRandomInt = (n) => {
	return Math.floor(Math.random() * n);
}

const computerSelect = () => {
	let comp = getRandomInt(3);
	return comp;
};

const updateScore = (winner) => {
	let update = document.getElementById(winner);

	if (winner=='player') {
		const displayWinner = document.querySelector('#winner-msg');
		displayWinner.innerHTML = `<h3> Player Wins </h3>`
		playerCount++;
		update.innerHTML = playerCount;
	} else if (winner=='computer') {
		const displayWinner = document.querySelector('#winner-msg');
		displayWinner.innerHTML = `<h3> Computer Wins </h3>`
		compCount++
		update.innerHTML = compCount;
	}
};

const resetScore = () => {
	playerCount = 0;
	compCount = 0;
	
	let resetP = document.querySelector('#player');
	resetP.innerHTML = playerCount;
	let resetC = document.querySelector('#computer');
	resetC.innerHTML = compCount;
};

const displayChoice = (p, c) => {
	const rpc = ['../images/rock.png', '../images/paper.png', '../images/scissors.png']
	const left = document.querySelector('#player-choice');
	const right = document.querySelector('#comp-choice');
	left.src = rpc[p];
	right.src = rpc[c];

	// const displayWinner = document.querySelector('#winner-msg');
	
	// displayWinner.innerHTML = `<h1> ${jonKenPo[p]}\t${jonKenPo[c]} </h1>`

	setTimeout(function() {
		left.src = rpc[0];
		right.src = rpc[0];
		// displayWinner.removeChild('h1');
	}, 2000);
};

const playGame = async(p) => {
	const results = ['Its a tie!', 'Player wins', 'Computer wins'];
	let message;
	let c = computerSelect();

	// logic
	if (p==c) {
		message = results[0];
	} else if (p==2 & c==0) { // scissors -- rock
		message = results[2];
		updateScore('computer');
	} else if (p==0 & c==2) { // rock -- scissors
		message = results[1];
		updateScore('player');
	} else if (p==0 & c==1) { // rock -- paper
		message = results[2];
		updateScore('computer');
	} else if (p==1 & c==0) { // paper -- rock
		message = results[1];
		updateScore('player');
	} else if (p==2 & c==1) { // scissors -- paper
		message = results[1];
		updateScore('player');
	} else if (p==1 & c==2) { // paper -- scissors
		message = results[2];
		updateScore('computer');
	}

	displayChoice(p, c);

	// alert(`player: ${jonKenPo[p]}, computer: ${jonKenPo[c]}\n${message}`);
};

const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const reset = document.querySelector('#reset');

rock.addEventListener('click', () => {
	playGame(0);
});

paper.addEventListener('click', () => {
	playGame(1);
});

scissors.addEventListener('click', () => {
	playGame(2);
});

reset.addEventListener('click', () => {
	resetScore();
})

