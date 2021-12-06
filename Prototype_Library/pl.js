// Sample Entries to mimic persistent data
class Book {
	constructor(title, author, pages, didRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.didRead = didRead;
	}

	set updateRead(bool) {
		this.didRead = bool;
		return this;
	};
};

class Library {
	library = [
		{
			title: 'Harry Potter',
			author: 'J.K. Rowling',
			pages: 223,
			didRead: true
		},
		{
			title: '1984',
			author: 'Gerorge Orwell',
			pages: 328,
			didRead: false
		}
	];

	addEntry(book) {
		this.library.push(book);
		console.log(library);
	}

	deleteEntry(id) {
		const selectedTitle = library[id]['title'].replace(/\s/g, '');
		const deletedElement = document.querySelector(`#${selectedTitle}`);
		deletedElement.remove();
		delete library[id];
	};
		
	updateRead(id) {
		const updatedCol = document.querySelector(`#${id}`);
		const row = updatedCol.parentNode.parentNode;
		
		if (updatedCol.textContent === 'No') {
			updatedCol.innerHTML = 'Yes';
			row.setAttribute('class', 'table-success');
		} else if (updatedCol.textContent === 'Yes') {
			updatedCol.innerHTML = 'No';
			row.setAttribute('class', 'table-warning');
		}
	};

	updateTable() {
		const table = document.querySelector('table');
		let checkRows = [];
		for (let row of table.rows) {
			checkRows.push(row.firstChild.innerHTML);
		};

		for (let i=0; i<this.library.length; i++) {
			if (checkRows.includes(this.library[i]['title'])) {
				console.log(this.library[i]);
			} else {
				let newRow = document.createElement('tr');
				let rowId = this.library[i]['title'].replace(/\s/g, '');
				newRow.setAttribute('id', rowId);

				let title = document.createElement('td');
				title.textContent = this.library[i]['title'];
				newRow.appendChild(title);

				let author = document.createElement('td');
				author.textContent = this.library[i]['author'];
				newRow.appendChild(author);

				let pages = document.createElement('td');
				pages.textContent = this.library[i]['pages'];
				newRow.appendChild(pages);

				let didRead = document.createElement('td')
				let readBtn = document.createElement('button');
				readBtn.classList.add('btn', 'didReadBtn');
				readBtn.setAttribute('id', `read${i}`);
				// readBtn.onclick = function() { updateRead(this.id) };
				didRead.appendChild(readBtn);

				if (this.library[i]['didRead'] == false) {
					newRow.setAttribute('class', 'table-warning');
					readBtn.textContent = "No";
					newRow.appendChild(didRead);
				} else {
					newRow.setAttribute('class', 'table-success');
					readBtn.textContent = "Yes";
					newRow.appendChild(didRead);
				};

				let del = document.createElement('td');
				let deleteBtn = document.createElement('button');
				deleteBtn.classList.add('btn', 'btn-danger', 'delete');
				deleteBtn.textContent = 'Delete';
				deleteBtn.style.background = 'red';
				deleteBtn.setAttribute('id', i);
				// deleteBtn.onclick = function() { deleteEntry(this.id) };
				del.appendChild(deleteBtn);
				newRow.appendChild(del);
				
				table.appendChild(newRow);
			}
		}
	};
};

let library = new Library();
library.updateTable();

document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const pages = document.querySelector('#pages').value;
	const hasRead = document.querySelector('#read').checked;

	let book = new Book(title, author, pages, hasRead);
	library.addEntry(book);
	library.updateTable();
});

const deleteBtn = document.querySelectorAll('.delete');

const updateRead = document.querySelectorAll('.didReadBtn');


// breaks the don't repeat yourself rule, but we need a function to update the list without completely reloading the entire thing
// Book.prototype.updateTable = function () {
// 	const table = document.querySelector('tbody');

// 	let newRow = document.createElement('tr');
// 	let rowId = library[library.length-1]['title'].replace(/\s/g, '');
// 	newRow.setAttribute('id', rowId);

// 	let title = document.createElement('td');
// 	title.textContent = this.title;
// 	newRow.appendChild(title);

// 	let author = document.createElement('td');
// 	author.textContent = this.author;
// 	newRow.appendChild(author);

// 	let pages = document.createElement('td');
// 	pages.textContent = this.pages;
// 	newRow.appendChild(pages);

// 	let didRead = document.createElement('td')
// 	let readBtn = document.createElement('button');
// 	readBtn.classList.add('btn', 'didReadBtn');
// 	readBtn.setAttribute('id', `read${library.length}`);
// 	readBtn.onclick = function() { updateRead(this.id) };
// 	didRead.appendChild(readBtn);
// 	if (this.didRead == false) {
// 		newRow.setAttribute('class', 'table-warning');
// 		readBtn.textContent = "No";
// 		newRow.appendChild(didRead);
// 	} else {
// 		newRow.setAttribute('class', 'table-success');
// 		readBtn.textContent = "Yes";
// 		newRow.appendChild(didRead);
// 	};

// 	let del = document.createElement('td');
// 	let deleteBtn = document.createElement('button');
// 	deleteBtn.classList.add('btn', 'btn-danger', 'delete');
// 	deleteBtn.textContent = 'Delete';
// 	deleteBtn.style.background = 'red';
// 	deleteBtn.setAttribute('id', library.length-1);
// 	deleteBtn.onclick = function() { deleteEntry(this.id) };
// 	del.appendChild(deleteBtn);
// 	newRow.appendChild(del);
		
// 	table.appendChild(newRow);
// };

// function deleteEntry(id) {
// 	const selectedTitle = library[id]['title'].replace(/\s/g, '');
// 	const deletedElement = document.querySelector(`#${selectedTitle}`);
// 	deletedElement.remove();
// 	delete library[id];
// };

// function updateRead(id) {
// 	const updatedCol = document.querySelector(`#${id}`);
// 	const row = updatedCol.parentNode.parentNode;

// 	if (updatedCol.textContent === 'No') {
// 		updatedCol.innerHTML = 'Yes';
// 		row.setAttribute('class', 'table-success');
// 	} else if (updatedCol.textContent === 'Yes') {
// 		updatedCol.innerHTML = 'No';
// 		row.setAttribute('class', 'table-warning');
// 	}
// };

// (function() {
// 	const table = document.querySelector('tbody');
	
// 	for (let i=0; i<library.length; i++) {
// 		let newRow = document.createElement('tr');
// 		let rowId = library[i]['title'].replace(/\s/g, '');
// 		newRow.setAttribute('id', rowId);

// 		let title = document.createElement('td');
// 		title.textContent = library[i]['title'];
// 		newRow.appendChild(title);

// 		let author = document.createElement('td');
// 		author.textContent = library[i]['author'];
// 		newRow.appendChild(author);

// 		let pages = document.createElement('td');
// 		pages.textContent = library[i]['pages'];
// 		newRow.appendChild(pages);

// 		let didRead = document.createElement('td')
// 		let readBtn = document.createElement('button');
// 		readBtn.classList.add('btn', 'didReadBtn');
// 		readBtn.setAttribute('id', `read${i}`);
// 		readBtn.onclick = function() { updateRead(this.id) };
// 		didRead.appendChild(readBtn);
// 		if (library[i]['didRead'] == false) {
// 			newRow.setAttribute('class', 'table-warning');
// 			readBtn.textContent = "No";
// 			newRow.appendChild(didRead);
// 		} else {
// 			newRow.setAttribute('class', 'table-success');
// 			readBtn.textContent = "Yes";
// 			newRow.appendChild(didRead);
// 		};

// 		let del = document.createElement('td');
// 		let deleteBtn = document.createElement('button');
// 		deleteBtn.classList.add('btn', 'btn-danger', 'delete');
// 		deleteBtn.textContent = 'Delete';
// 		deleteBtn.style.background = 'red';
// 		deleteBtn.setAttribute('id', i);
// 		deleteBtn.onclick = function() { deleteEntry(this.id) };
// 		del.appendChild(deleteBtn);
// 		newRow.appendChild(del);
		
// 		table.appendChild(newRow);
// 	}
// }) ();


