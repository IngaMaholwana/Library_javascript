const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputRead = document.getElementById("read");

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.addBookToDOM(book);
    }

    removeBook(bookID) {
        this.removeBookFromDOM(bookID);
        this.removeBookFromCollection(bookID);
    }

    removeBookFromCollection(id) {
        this.books = this.books.filter((book) => book.id != id);
    }

    removeBookFromDOM(id) {
        const requiredBook = document.getElementById(id);
        requiredBook.remove();
    }

    toggleReadStatus(id) {
        this.toggleReadStatusCollection(id);
        this.toggleReadStatusDOM(id);
    }

    toggleReadStatusCollection(bookID) {
        this.books.forEach((book) => {
            if(book.id == bookID) {
                book.toggleRead();
                return;
            }
        });
    }

    toggleReadStatusDOM(bookID) {
        const readDOM = document.getElementById(bookID).getElementsByClassName("read")[0];
        const removeBtn = document.getElementById(bookID).getElementsByClassName("read-btn")[0];

        this.books.forEach((book) => {
            if(book.id == bookID) {
                readDOM.textContent = "Status : " + (book.read ? "Read" : "Not Read");
                removeBtn.textContent = "Change to " + (!book.read ? "Read" : "Not Read");
                return;
            }
        });
    }

    addBookToDOM(book) {
        const bookObj = document.createElement("div");
        bookObj.classList.add("book");
        const bookID = book.id;
        bookObj.id = bookID;

        const elements = {
            title: book.title,
            author: "Written by " + book.author,
            pages: book.pages + " pages",
            read: "Status : " + (book.read ? "Read" : "Not Read")
        };

        Object.entries(elements).forEach(([className, content]) => {
            const element = document.createElement("p");
            element.classList.add(className);
            element.innerHTML = content;
            bookObj.appendChild(element);
        });

        const buttons = document.createElement("div");
        buttons.classList.add("btns");

        const readBtn = document.createElement("button");
        readBtn.addEventListener("click", () => this.toggleReadStatus(bookID));
        readBtn.textContent = "Change to " + (!book.read ? "Read" : "Not Read");
        readBtn.classList.add("read-btn");
        buttons.appendChild(readBtn);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => this.removeBook(bookID));
        removeBtn.classList.add("remove-btn");
        buttons.appendChild(removeBtn);

        bookObj.appendChild(buttons);
        document.getElementById("books").appendChild(bookObj);
    }
}

class Book {
    constructor(title, author, pages, read, library) {
        this.id = library.books.length < 1 ? 1 : library.books[library.books.length - 1].id + 1;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    displayDetails() {
        console.log(this.title);
        console.log(this.author);
    }

    toggleRead() {
        this.read = !this.read;
    }
}

// Initialize library
const myLibrary = new Library();

// Event Listeners
const showBtn = document.getElementById("showBtn");
const dialog = document.getElementById("dialog");
const closeBtn = document.getElementById("closeBtn");

showBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());

// Initial books
const initialBooks = [
    ["Buzani Kubawo", "Witness K. Tamsanqa", 144, true],
    ["Abantu Besizwe", "S.E.K Mqhayi", 99, false],
    ["Random Book", "Random Guy", 321, false],
    ["Non-Random Book", "Non-Random Guy", 123, true]
];

initialBooks.forEach(([title, author, pages, read]) => {
    myLibrary.addBook(new Book(title, author, pages, read, myLibrary));
});

// Submit event handler
const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    const newTitle = inputTitle.value;
    const newAuthor = inputAuthor.value;
    const newPages = inputPages.value;
    const newRead = inputRead.checked;

    if(newTitle || newAuthor || newPages) {
        const newBook = new Book(newTitle, newAuthor, newPages, newRead, myLibrary);
        myLibrary.addBook(newBook);

        // Clear inputs
        [inputAuthor, inputPages, inputTitle].forEach(input => input.value = "");
    } else {
        alert("Invalid input. Please try again!");
    }
});
