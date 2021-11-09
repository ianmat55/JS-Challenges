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
		playerCount++;
		update.innerHTML = playerCount;
	} else if (winner=='computer') {
		compCount++
		update.innerHTML = compCount;
	}
};

const resetScore = () => {
	let resetP = document.getElementById('player');
	resetP.innerHTML = 0;
	let resetC = document.getElementById('computer');
	resetC.innerHTML = 0;
};

const displayChoice = (p, c) => {
	const rpc = ['../images/rock.png', '../images/paper.png', '../images/scissors.png']
	const left = document.querySelector('#player-choice');
	const right = document.querySelector('#comp-choice');
	left.src = rpc[p];
	right.src = rpc[c];

	const displayWinner = document.querySelector('#winner-msg');
	
	displayWinner.innerHTML = `<h1> player: ${jonKenPo[p]}, computer: ${jonKenPo[c]} </h1>`

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
		if (p==0 & c==0) {
			displayChoice(0, 0);
		} else if (p==1 & c==1) {
			displayChoice(1, 1);
		} else {
			displayChoice(2, 2);
		}
	} else if (p>c & c==0 & p!=1) { // scissors -- rock
		message = results[2];
		updateScore('computer');
		displayChoice(2,0) 
	} else if (p<c & p==0 & c!=1) { // rock -- scissors
		message = results[1];
		updateScore('player');
		displayChoice(0,2)
	} else if (p<c & c==1) { // rock -- paper
		message = results[2];
		updateScore('computer');
		displayChoice(0,1)
	} else if (p>c & p==1) { // paper -- rock
		message = results[1];
		updateScore('player');
		displayChoice(1,0)
	} else if (p>c) { // scissors -- paper
		message = results[1];
		updateScore('player');
		displayChoice(2,1)
	} else if (c>p) { // paper -- scissors
		message = results[2];
		updateScore('computer');
		displayChoice(1,2)
	}

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

