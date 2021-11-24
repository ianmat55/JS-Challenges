// Sample Entries to mimic persistent data
let library = [
	{
		title: 'Harry Potter',
		author: 'J.K. Rowling',
		pages: 223,
		didRead: true
	},
	{
		title: 'Nineteen Eighty-Four',
		author: 'Gerorge Orwell',
		pages: 328,
		didRead: false
	}
];

function Book(title, author, pages, didRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.didRead = didRead;
};

function deleteEntry(id) {
	console.log('hello');
	console.log(id);
};


// Immediately display books in library, remove when upgrading to either local/database storage
(function() {
	const table = document.querySelector('tbody');
	
	for (let i=0; i<library.length; i++) {
		let newRow = document.createElement('tr');
		newRow.setAttribute('id', i);

		let title = document.createElement('td');
		title.textContent = library[i]['title'];
		newRow.appendChild(title);

		let author = document.createElement('td');
		author.textContent = library[i]['author'];
		newRow.appendChild(author);

		let pages = document.createElement('td');
		pages.textContent = library[i]['pages'];
		newRow.appendChild(pages);

		let didRead = document.createElement('td')
		if (library[i]['didRead'] == false) {
			newRow.setAttribute('class', 'table-warning');
			didRead.textContent = "No";
			newRow.appendChild(didRead);
		} else {
			newRow.setAttribute('class', 'table-success');
			didRead.textContent = "Yes";
			newRow.appendChild(didRead);
		};

		let del = document.createElement('td');
		let deleteBtn = document.createElement('button');
		deleteBtn.classList.add('btn', 'btn-danger', 'delete');
		deleteBtn.textContent = 'Delete';
		deleteBtn.style.background = 'red';
		deleteBtn.setAttribute('id', i);
		del.appendChild(deleteBtn);
		newRow.appendChild(del);
		
		table.appendChild(newRow);
	}
}) ();


// breaks the don't repeat yourself rule, but we need a function to update the list without completely reloading the entire thing
Book.prototype.updateTable = function () {
	const table = document.querySelector('tbody');

	let newRow = document.createElement('tr');
	newRow.setAttribute('id', library.length);

	let title = document.createElement('td');
	title.textContent = this.title;
	newRow.appendChild(title);

	let author = document.createElement('td');
	author.textContent = this.author;
	newRow.appendChild(author);

	let pages = document.createElement('td');
	pages.textContent = this.pages;
	newRow.appendChild(pages);

	let didRead = document.createElement('td')
	if (this.didRead == false) {
		newRow.setAttribute('class', 'table-warning');
		didRead.textContent = "No";
		newRow.appendChild(didRead);
	} else {
		newRow.setAttribute('class', 'table-success');
		didRead.textContent = "Yes";
		newRow.appendChild(didRead);
	};

	let del = document.createElement('td');
	let deleteBtn = document.createElement('button');
	deleteBtn.classList.add('btn', 'btn-danger', 'delete');
	deleteBtn.textContent = 'Delete';
	deleteBtn.style.background = 'red';
	deleteBtn.setAttribute('id', table.length);
	del.appendChild(deleteBtn);
	newRow.appendChild(del);
		
	table.appendChild(newRow);
};


document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const pages = document.querySelector('#pages').value;
	const hasRead = document.querySelector('#read').checked;

	let book = new Book(title, author, pages, hasRead);
	library.push(book);
	book.updateTable(book);
});


