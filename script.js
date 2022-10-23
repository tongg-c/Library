const addBook = document.getElementById('addBook')
const openButton = document.querySelector('.open-button')
const modal = document.querySelector('.modal')
const gridContainer = document.querySelector('.grid-container')
let myLibrary = []

function Book(title, author, pages, haveRead) {
	this.title = title
	this.author = author
	this.pages = pages
	this.haveRead = haveRead
}

function addBookToLibrary() {
	const book = new Book(title, author, pages, haveRead)
	myLibrary.push(book)
}

function addBookCard() {
	gridContainer.innerHTML = ''
	myLibrary.forEach((book, index) => {
		const gridElement = document.createElement('div')
		gridElement.classList.add('grid-element')
		const h2 = document.createElement('h2')
		h2.textContent = book.title
		const author = document.createElement('p')
		author.textContent = book.author
		const pages = document.createElement('p')
		pages.textContent = `${book.pages} pages`
		const readButton = document.createElement('button')
		if (book.haveRead) {
			readButton.textContent = 'Read'
			readButton.style.backgroundColor = '#EDF2F4'
			readButton.style.color = 'black'
		} else {
			readButton.textContent = 'Not Read'
			readButton.style.backgroundColor = '#d90429'
			readButton.style.color = 'white'
		}
		changeReadStatus(index, readButton)
		const removeButton = document.createElement('button')
		removeBook(index, removeButton)
		removeButton.textContent = 'Remove'
		gridElement.append(h2, author, pages, readButton, removeButton)
		gridContainer.appendChild(gridElement)
	})
}

function changeReadStatus(index, readButton) {
	readButton.addEventListener('click', e => {
		myLibrary[index].haveRead = !myLibrary[index].haveRead
		if (myLibrary[index].haveRead) {
			readButton.textContent = 'Read'
			readButton.style.backgroundColor = '#EDF2F4'
			readButton.style.color = 'black'
		} else {
			readButton.textContent = 'Not Read'
			readButton.style.backgroundColor = '#d90429'
			readButton.style.color = 'white'
		}
	})
}

function removeBook(index, removeButton) {
	removeButton.addEventListener('click', e => {
		myLibrary.splice(index, 1)
		addBookCard()
	})
}

function deleteBook() {}

addBook.addEventListener('submit', e => {
	modal.close()
	e.preventDefault()
	const title = e.target.elements.title
	const author = e.target.elements.author
	const pages = e.target.elements.pages
	const haveRead = e.target.elements.checkbox
	const book = new Book(
		title.value,
		author.value,
		pages.value,
		haveRead.checked
	)
	myLibrary.push(book)
	addBookCard(book)
	title.value = ''
	author.value = ''
	pages.value = ''
	haveRead.value = false
})

openButton.addEventListener('click', e => {
	modal.showModal()
})

window.addEventListener('click', e => {
	if (e.target.tagName !== 'DIALOG') return
	const rect = e.target.getBoundingClientRect()

	const clickedInDialog =
		rect.top <= e.clientY &&
		e.clientY <= rect.top + rect.height &&
		rect.left <= e.clientX &&
		e.clientX <= rect.left + rect.width

	if (clickedInDialog === false) modal.close()
})
