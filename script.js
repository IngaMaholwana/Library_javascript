const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputRead = document.getElementById("read");
let myLibrary = [];

function Book(title, author, pages, read) {
    this.id = (myLibrary.length<1) ? 1 : myLibrary[myLibrary.length - 1].id+1 ;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayDetails = function() {
        console.log(this.title);
        console.log(this.author);
    };
    this.toggleRead = function() {
        this.read = !(this.read);
    }
}

function removeBookFromDOM(id){
    const requiredBook = document.getElementById(id);
    requiredBook.remove();
}

function removeBookFromCollection(id){
    myLibrary = myLibrary.filter((book) => book.id != id);
}

function removeBook(bookID){
    removeBookFromDOM(bookID);
    removeBookFromCollection(bookID);
}

function toggleReadStatusCollection(bookID){
    myLibrary.forEach((book) => {
        if(book.id == bookID){
            book.toggleRead();
            return;
        }
    });
}

function toggleReadStatusDOM(bookID){
    const readDOM = document.getElementById(bookID).getElementsByClassName("read")[0];
    const removeBtn = document.getElementById(bookID).getElementsByClassName("read-btn")[0];

    myLibrary.forEach((book) => {
        if(book.id == bookID){
            readDOM.textContent = "Status : " + ((book.read) ? "Read" : "Not Read");
            removeBtn.textContent = "Change to " + (!(book.read) ? "Read" : "Not Read");
            return;
        }
    });}

function toggleReadStatus(id){
    toggleReadStatusCollection(id);
    toggleReadStatusDOM(id);
}


const addBookToDOM = (book) => {
    const bookObj = document.createElement("div");
    bookObj.classList.add("book");
    const bookID = book.id;
    bookObj.id = bookID;
    const title = document.createElement("p");
    title.classList.add("title");
    const author = document.createElement("p");
    author.classList.add("author");
    const pages = document.createElement("p");
    pages.classList.add("pages");
    const read = document.createElement("p");
    read.classList.add("read");

    title.innerHTML = book.title;
    author.innerHTML = "Written by " + book.author;
    pages.innerHTML = book.pages + " pages";
    read.innerHTML = "Status : " + ((book.read) ? "Read" : "Not Read");

    bookObj.appendChild(title);
    bookObj.appendChild(author);
    bookObj.appendChild(pages);
    bookObj.appendChild(read);

    const buttons = document.createElement("div");
    buttons.classList.add("btns");

    const readBtn = document.createElement("button");
    readBtn.addEventListener("click", () => toggleReadStatus(bookID));
    readBtn.textContent = "Change to " + (!(book.read) ? "Read" : "Not Read");
    readBtn.classList.add("read-btn");
    buttons.appendChild(readBtn);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeBook(bookID));
    removeBtn.classList.add("remove-btn");
    buttons.appendChild(removeBtn);

    bookObj.appendChild(buttons);
        
    document.getElementById("books").appendChild(bookObj);
};

const showBtn = document.getElementById("showBtn");
const dialog = document.getElementById("dialog");
const closeBtn = document.getElementById("closeBtn");
showBtn.addEventListener("click", (e) => {
    dialog.showModal();
})
closeBtn.addEventListener("click", (e) => {
    dialog.close();
})

myLibrary.push((new Book("Never Split The Difference", "Napoleon Hill", 144, true)));
myLibrary.push((new Book("Rani Tatt", "Harmanjeet Singh", 99, false)));
myLibrary.push((new Book("Random Book", "Random Guy", 321, false)));
myLibrary.push((new Book("Non-Random Book", "Non-Random Guy", 123, true)));

myLibrary.forEach( (book) => {
    addBookToDOM(book);
} );

function validateBook(book){
    
}

const submit = document.getElementById("submit");
submit.addEventListener("click",(e) => {
    const newTitle = inputTitle.value;
    const newAuthor = inputAuthor.value;
    const newPages  = inputPages.value;
    const newRead = inputRead.checked;
/*    
    console.log("Title:", newTitle);
    console.log("Author:", newAuthor);
    console.log("Pages:", newPages);
    console.log("Read:", newRead);
*/

    if(newTitle || newAuthor || newPages){
        const newBook = new Book(newTitle,newAuthor,newPages,newRead);
        myLibrary.push(newBook);
        addBookToDOM(newBook);

        inputAuthor.value = "";
        inputPages.value = "";
        inputTitle.value = "";

        return;
    }
    else{
        alert("Invalid input. Please try again!");
        return;
    }
});