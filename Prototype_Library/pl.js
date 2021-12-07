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
			title: 'Nineteen Eighty Four',
			author: 'Gerorge Orwell',
			pages: 328,
			didRead: false
		}
	];

	addEntry(book) {
		this.library.push(book);
		console.log(this.library);
	}

	deleteEntry(id) {
		const selectedTitle = this.library[id]['title'].replace(/\s/g, '');
		const deletedElement = document.querySelector(`#${selectedTitle}`);
		deletedElement.remove();
		delete this.library[id];
	};
		
	updateRead(id) {
		const updatedCol = document.querySelector(`#read${id}`);
		const row = updatedCol.parentNode.parentNode;
		
		if (updatedCol.textContent === 'No') {
			updatedCol.innerHTML = 'Yes';
			row.setAttribute('class', 'table-success');
		} else if (updatedCol.textContent === 'Yes') {
			updatedCol.innerHTML = 'No';
			row.setAttribute('class', 'table-warning');
		}
		this.updateTable();
		console.log('hello');
		console.log(this.library);
	};

	updateTable() {
		const table = document.querySelector('table');
		let checkRows = [];
		for (let row of table.rows) {
			checkRows.push(row.firstChild.innerHTML);
		};

		for (let i=0; i<this.library.length; i++) {
			if (checkRows.includes(this.library[i]['title'])) {
				continue;
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
				del.appendChild(deleteBtn);
				newRow.appendChild(del);
				
				table.appendChild(newRow);
			}
		}
	};
};

// IIFE
(function() {
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
	deleteBtn.forEach((btn, id) => {
		btn.addEventListener('click', () => library.deleteEntry(id))
	});

	const updateRead = document.querySelectorAll('.didReadBtn');
	updateRead.forEach((btn, id) => {
		btn.addEventListener('click', () => library.updateRead(id))
	});
})();

