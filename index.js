const myLibrary = [];
const form = document.querySelector("#book-form");
const formContainer = document.querySelector(".form-container");
const exit = formContainer.querySelector(".form-exit");
const cardsContainer = document.querySelector("#cards-container");
const addButton = document.querySelector(".button--add-book");

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.hasRead ? "has read." : "not read yet."
    }`;
  }
  toggleHasRead() {
    this.hasRead = !this.hasRead;
  }
}

function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
}

function createCard(book, index) {
  const cardItem = document.createElement("li");
  const titleTag = document.createElement("h3");
  const authorTag = document.createElement("h4");
  const pagesTag = document.createElement("p");
  const hasReadTag = document.createElement("p");
  const remove = document.createElement("button");
  const toggleButton = document.createElement("button");

  titleTag.textContent = book.title;
  authorTag.textContent = `Written by ${book.author}`;
  pagesTag.textContent = `Total pages: ${book.pages}`;
  hasReadTag.textContent = book.hasRead ? "Read" : "Not Read";
  remove.textContent = "Remove Book";
  toggleButton.textContent = "Toggle Read";
  remove.addEventListener("click", () => removeBook(index));
  toggleButton.addEventListener("click", () => toggleRead(book));

  cardItem.appendChild(remove);
  cardItem.appendChild(toggleButton);
  cardItem.appendChild(titleTag);
  cardItem.appendChild(authorTag);
  cardItem.appendChild(pagesTag);
  cardItem.appendChild(hasReadTag);
  cardItem.setAttribute("data-index", index);

  cardsContainer.appendChild(cardItem);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleRead(book) {
  book.toggleHasRead();
  displayBooks();
}

function displayBooks() {
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }

  myLibrary.forEach((book, index) => createCard(book, index));
}

addButton.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.toggle("active");
});

exit.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.remove("active");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = form.querySelector("#book").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
  const hasRead = form.querySelector("#hasReadYes").checked;

  addBookToLibrary(title, author, pages, hasRead);
  displayBooks();
  form.reset();
  formContainer.classList.remove("active");
});
