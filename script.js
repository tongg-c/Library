const addBook = document.getElementById('addBook')
const openButton = document.querySelector('.open-button')
const modal = document.querySelector('.modal')
const gridContainer = document.querySelector('.grid-container')
let myLibrary = []

const createBook = (title, author, pages, haveRead) => ({
	title,
	author,
	pages,
	haveRead,
})

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

const changeReadStatus = (index, readButton) => {
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

addBook.addEventListener('submit', e => {
	modal.close()
	e.preventDefault()
	let title = e.target.elements.title.value
	let author = e.target.elements.author.value
	let pages = e.target.elements.pages.value
	let haveRead = e.target.elements.checkbox.checked
	const book = createBook(title, author, pages, haveRead)
	myLibrary.push(book)
	addBookCard(book)
	title = ''
	author = ''
	pages = ''
	haveRead = false
})

openButton.addEventListener('click', e => {
	modal.showModal()
})

modal.addEventListener('click', e => {
	if (e.target.tagName !== 'DIALOG') return
	const rect = e.target.getBoundingClientRect()

	const clickedInDialog =
		rect.top <= e.clientY &&
		e.clientY <= rect.top + rect.height &&
		rect.left <= e.clientX &&
		e.clientX <= rect.left + rect.width

	if (clickedInDialog === false) modal.close()
})
