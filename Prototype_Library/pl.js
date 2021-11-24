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

// Immediately display books in library;
(function() {
	const table = document.querySelector('tbody');
	
	for (let i=0; i<library.length; i++) {
		let newRow = document.createElement('tr');

		let title = document.createElement('td');
		title.textContent = library[i]['title'];
		newRow.appendChild(title);

		let author = document.createElement('td');
		author.textContent = library[i]['author'];
		newRow.appendChild(author);

		let pages = document.createElement('td');
		pages.textContent = library[i]['pages'];
		newRow.appendChild(pages);

		if (library[i]['didRead'] == false) {
			newRow.setAttribute('class', 'table-warning');
		} else {
			newRow.setAttribute('class', 'table-success');
		}
		table.appendChild(newRow);
	}
}) ();


function Book(title, author, pages, didRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.didRead = didRead;
};

document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const pages = document.querySelector('#pages').value;
	const hasRead = document.querySelector('#read').checked;

	let book = new Book(title, author, pages, hasRead);
	library.push(book);
});

