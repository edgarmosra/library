// variables

let myLibrary = [];
let bookContainer = document.querySelector(".book-container");
let addBookBtn = document.querySelector(".add-button");
let modal = document.querySelector(".modal");
let openModal = document.querySelector(".add-book");
let modalAddBookBtn = document.querySelector(".modal-add-book");
let addBookForm = document.getElementById("add-book-form");
let deleteBookBtn = document.getElementsByClassName("delete-book");

// event listeners

openModal.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
modalAddBookBtn.addEventListener("click", addBookToLibrary);

// functions

function Book(title, author, numOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = false;
  this.info = function () {
    return `${title} by ${author}, ${numOfPages} pages, ${
      this.isRead ? "has been read" : "not read yet"
    }`;
  };
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(e) {
  if (e.target === modal) {
    toggleModal();
  }
}

function addBookToLibrary(e) {
  e.preventDefault();

  let author = document.getElementById("author").value;
  let title = document.getElementById("title").value;
  let numOfPages = document.getElementById("page-num").value;
  let isChecked = document.getElementById("is-read").checked;
  let newBook = new Book(author, title, numOfPages);

  if (isChecked === true) {
    newBook.isRead = true;
  }

  myLibrary.push(newBook);
  addBookForm.reset();
  displayBooks();
}

function displayBooks() {
  let recentBook = myLibrary[myLibrary.length - 1];
  let createBook = document.createElement("div");
  let deleteBtn = document.createElement("button");

  createBook.setAttribute("book-index", `${myLibrary.length - 1}`);
  createBook.textContent = recentBook.info();
  bookContainer.append(createBook);

  deleteBtn.classList.add("delete-book");
  deleteBtn.setAttribute("delete-index", `${myLibrary.length - 1}`);
  deleteBtn.textContent = "delete book";
  bookContainer.append(deleteBtn);

  deleteBtn.addEventListener("click", (e) => {
    let bookIndex = Number(createBook.getAttribute("book-index"));

    createBook.remove();
    deleteBtn.remove();

    removeValue(myLibrary, bookIndex);
  });
}

function removeValue(arr, index) {
  let newLibrary = arr.filter((_, i) => i !== index);
  myLibrary = newLibrary;
}
