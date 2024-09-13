const myLibrary = [];
const Modal = document.querySelector(".modal");
const newBookButton = document.getElementById("new");
const pageLabel = document.getElementById("readLabel");
const readBook = document.getElementById("readLabelUsed");
const submit = document.getElementById("submitButton");

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;

    this.isRead = function() {
        return this.read ? "Read" : "Not Yet Read";
    };
    this.info = function() {
        console.log(`${this.title} by ${this.author}, ${this.pages}, ${this.isRead()}`);
    };
}


function addBookToLibrary(title, author, pages) {
    const newBook = new book(title, author, pages);
    myLibrary.push(newBook);
    console.log(myLibrary);
    return newBook;
}



newBookButton.addEventListener("click", () => {
    Modal.showModal();
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    Modal.close();

    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const pageNo = document.getElementById('pagesRead').value;

    addBookToLibrary(title, author, pageNo);

    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('pagesRead').value = '';

    createCard(title, author, pageNo);
});

function readCheck() {
    const pagesRead = parseInt(document.getElementById("pagesRead").value, 10); // Correct selection

    if (isNaN(pagesRead) || pagesRead === 0) {
        readBook.textContent = "";
    } else {
        readBook.textContent = "Book is not yet read";
    }
}

document.getElementById('pagesRead').addEventListener('input', readCheck);

function createCard(title, author, pageLabel) {
    const displaySection = document.getElementById('displayArea');

    const card = document.createElement('div');
    card.classList.add('book-card');

    const titleAttach = document.createElement('p');
    titleAttach.textContent = `Title: ${title}`;
    const authorAttach = document.createElement('p');
    authorAttach.textContent = `Author: ${author}`;
    const pageAttach = document.createElement('p');
    pageAttach.textContent = `Page Number: ${pageLabel}`;
    const readButton = document.createElement('button');
    readButton.textContent = 'Unread';
    const removeBook = document.createElement('button');
    removeBook.textContent = 'Remove';

    card.appendChild(titleAttach);
    card.appendChild(authorAttach);
    card.appendChild(pageAttach);
    card.appendChild(readButton);
    card.appendChild(removeBook);

   readButton.addEventListener("click", () => {
        if(readButton.textContent === 'Unread') {
            readButton.textContent = 'Read';
            const foundBook = myLibrary.find(book => book.title === title && book.author === author && book.pages === pageLabel);
            if (foundBook) {
                foundBook.read = true;
            }
        } else {
        readButton.textContent = 'Unread';
        const foundBook = myLibrary.find(book => book.title === title && book.author === author && book.pages === pageLabel);
            if (foundBook) {
                foundBook.read = false;
            }
   }

   });

   removeBook.addEventListener("click", () => {
    const removedBook = myLibrary.findIndex(book => book.title === title && book.author === author && book.pages === pageLabel);
        if(removedBook !== -1) {
            myLibrary.splice(removedBook, 1);
            card.remove();
        }
});
   

    displaySection.appendChild(card);

}
        
   
