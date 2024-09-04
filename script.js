//JS Для Pupup
const popupbgDOM = document.querySelector(".popupbg");
const popupDOM = document.querySelector(".popup");
const closePopupButtonDOM = document.querySelector(".close_popup");
const addBookDOM = document.querySelector(".add_book");

addBookDOM.onclick = () => {
    popupbgDOM.classList.add("active");
    popupDOM.classList.add("active");
}

function closePopup() {
    popupbgDOM.classList.remove("active");
    popupDOM.classList.remove("active");
}

closePopupButtonDOM.onclick = closePopup;

// JS для обновления страницы
const refreshDOM = document.querySelector(".refresh");

refreshDOM.onclick = () => {
    window.location.reload();
}

//JS для очищения массива bookList
const clearAllDOM = document.querySelector(".clear_list");
const itemsDOM = document.querySelector(".catalog-items");
const bookDOM = document.querySelectorAll(".book");

clearAllDOM.onclick = () => {
    localStorage.clear();
    itemsDOM.replaceChildren();
};

//JS Для добавления книги в массив и в HTML

const bookList = JSON.parse(localStorage.getItem("bookList")) || [];

const bookSubmitDOM = document.querySelector("#bookSubmit");
bookSubmitDOM.onclick = onSubmit;

function createDOM(newBook) {
    const currentBookNumber = bookList.indexOf(newBook);
    const newBookElement = document.createElement("div");
    newBookElement.className = "book";
    newBookElement.innerHTML = `
        <h3>${newBook.name}</h3>
        <p>Автор: ${newBook.author}</p>
        <p>Год издания: ${newBook.date}</p>
        <p>Жанр: ${newBook.genre}</p>
        <p>Прочитана: ${newBook.status ? 'Да' : 'Нет'}</p>
    `;

    const deleteDOM = document.createElement("button");
    const deleteContent = document.createTextNode("Удалить книгу");
    deleteDOM.appendChild(deleteContent);
    deleteDOM.addEventListener('click', () => {
        deleteBook(currentBookNumber);
    });
    
    const changeDOM = document.createElement("button");
    const changeContent = document.createTextNode("Изменить книгу");
    changeDOM.appendChild(changeContent);
    changeDOM.addEventListener('click', () => {
        changeBook(newBook, currentBookNumber);
    });

    itemsDOM.appendChild(newBookElement);
    newBookElement.appendChild(deleteDOM);
    newBookElement.appendChild(changeDOM);
}

function onSubmit() {
    const newBook = {};
    newBook.name = document.getElementById("bookName").value;
    newBook.author = document.getElementById("bookAuthor").value;
    newBook.date = document.getElementById("bookDate").value;
    newBook.genre = document.getElementById("bookGenre").value;
    newBook.status = document.getElementById("bookStatus").checked;

    bookList.push(newBook);

    createDOM(newBook);

    localStorage.setItem('bookList', JSON.stringify(bookList));
    closePopup();
}

window.onload = () => {

    localStorage.setItem('bookList', JSON.stringify(bookList));
    bookList.forEach((newBook) => {
        createDOM(newBook);
    });
};

//JS для удаления одной книги

function deleteBook(bookNumber) {
    bookList.splice(bookNumber, 1);

    localStorage.setItem('bookList', JSON.stringify(bookList));
    itemsDOM.replaceChildren();

    bookList.forEach(newBook => {
        createDOM(newBook);
    });
}
// JS для изменения книги

function changeBook(book, index) {
    const popupbgChangeDOM = document.querySelector(".popupbgChange");
    const popupChangeDOM = document.querySelector(".popupChange");
    const closePopupChangeDOM = document.querySelector(".close_popupChange");

    popupbgChangeDOM.classList.add("active");
    popupChangeDOM.classList.add("active");

    function closePopopChange() {
        popupbgChangeDOM.classList.remove("active");
        popupChangeDOM.classList.remove("active");
    }

    closePopupChangeDOM.addEventListener("click", () => {
        closePopopChange();
    });

    const nameValue = document.querySelector(".bookNameChange");
    const authorValue = document.querySelector(".bookAuthorChange");
    const dateValue = document.querySelector(".bookDateChange");
    const genreValue = document.querySelector(".bookGenreChange");
    const statusValue = document.querySelector(".bookStatusChange");

    nameValue.value = book.name;
    authorValue.value = book.author;
    dateValue.value = book.date;
    genreValue.value = book.genre;
    statusValue.checked = book.status;
    
    const changeDOM = document.querySelector(".bookChange");

    changeDOM.addEventListener('click', () => {
        book.name = document.querySelector(".bookNameChange").value;
        book.author = document.querySelector(".bookAuthorChange").value;
        book.date = document.querySelector(".bookDateChange").value;
        book.genre = document.querySelector(".bookGenreChange").value;
        book.status = document.querySelector(".bookStatusChange").checked;

        localStorage.setItem('bookList', JSON.stringify(bookList));

        console.log(book);
        console.log(index);

        closePopopChange();
    });
}
// заменить на DOM константы
