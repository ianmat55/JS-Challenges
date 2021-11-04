// User selects rock, rock paper or scissors. Computer selects rock, paper or scissors. 
// Keeps track of wins/losses
// cool animation

const getRandomInt = (n) => {
	return Math.floor(Math.random() * n);
}

const playerSelect = () => {
	let player = window.prompt("rock, paper, scissors");
	return player;
};

const computerSelect = () => {
	let comp = getRandomInt(3);
	return comp;
};

const playGame = async(p) => {
	const results = ['Its a tie!', 'Player wins', 'Computer wins'];
	const jonKenPo = ['rock', 'paper', 'scissors']
	let message;
	let playerCount = 0;
	let compCount = 0;
	let c = computerSelect();

	// logic
	if (p==c) {
		message = results[0];
	} else if (p>c & c==0 & p!=1) {
		message = results[2];
		compCount++;
	} else if (p<c & p==0 & c!=1) {
		message = results[1];
		playerCount++;
	} else if (p<c & c==1) {
		message = results[2];
		compCount++;
	} else if (p>c & p==1) {
		message = results[1];
		playerCount++;
	} else if (p>c) {
		message = results[1];
		playerCount++;
	} else if (c>p) {
		message = results[2];
		compCount++;
	}

	alert(`player: ${jonKenPo[p]}, computer: ${jonKenPo[c]}\n${message}`);
};