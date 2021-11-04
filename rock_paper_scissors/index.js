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
}

const playGame = async(p) => {
	const results = ['Its a tie!', 'Player wins', 'Computer wins'];
	let message;
	let c = computerSelect();

	// logic
	if (p==c) {
		message = results[0];
	} else if (p>c & c==0 & p!=1) {
		message = results[2];
		updateScore('computer');
	} else if (p<c & p==0 & c!=1) {
		message = results[1];
		updateScore('player');
	} else if (p<c & c==1) {
		message = results[2];
		updateScore('computer');
	} else if (p>c & p==1) {
		message = results[1];
		updateScore('player');
	} else if (p>c) {
		message = results[1];
		updateScore('player');
	} else if (c>p) {
		message = results[2];
		updateScore('computer');
	}

	alert(`player: ${jonKenPo[p]}, computer: ${jonKenPo[c]}\n${message}`);
};