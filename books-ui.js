export class BooksUI {
  searchResultHolder;
  bookInfoHolder;

  currentPage = [];

  api;

  constructor(api) {
    this.searchResultHolder = document.getElementById("searchResultHolder");
    this.bookInfoHolder = document.getElementById("bookInfoHolder");
    this.bookList = document.getElementById("readList");

    const searchInput = document.getElementById("searchInput");
    const goButton = document.getElementById("goButton");

    goButton.addEventListener("click", () => {
      const querry = searchInput.value;
      if (!querry) {
        return;
      }

      api.search(querry).then(page => {
        this.processSearchResult(page);
      });
    });

    this.searchResultHolder.addEventListener("click", event => {
      const targetDiv = event.target;
      const id = targetDiv.id;

      const selectedBook = this.currentPage.find(item => item.id === id);
      if (!selectedBook) {
        return;
      }

      if (this.selectedBook) {
        const selectedBook = this.searchResultHolder.querySelector(
          "#" + this.selectedBook.id
        );
        selectedBook.classList.remove("select-book");
      }

      this.bookInfoHolder.innerHTML = `
        <h2>${selectedBook.title}</h2>
        <div>languages availiable: ${selectedBook.language.join(", ")} </div>
      `;

      let add = document.createElement("button");
      let addButtonBook = this.bookInfoHolder.appendChild(add);
      addButtonBook.innerHTML = `add to list`;
      addButtonBook.setAttribute("id", "addButton");
      const addButton = document.getElementById("addButton");

      let bookArr = [];

      const moveBookToList = addButton.addEventListener("click", function() {
        const bookListContainer = document.getElementById("container");
        const bookListItem = document.createElement("div");

        bookListContainer.appendChild(bookListItem);
        bookListItem.innerHTML = `${selectedBook.title}`;
        bookListItem.setAttribute("class", bookListItem);

        bookArr += bookListItem;
        addButton.disabled = true;
        console.log(bookArr);
        function setData() {
          return localStorage.setItem("ok", bookListItem.innerHTML);
        }
        setData();
      });

      function getData() {
        bookArr.forEach(function() {
          if (localStorage.length > 0) {
            return localStorage.getItem("ok");
          }
        });
      }
      getData();
    });
  }

  processSearchResult(page) {
    page.docs.forEach(item => {
      item.id = item.key.split("/").pop();
    });

    this.currentPage = page.docs;

    const booksHTML = page.docs.reduce((acc, item) => {
      return (
        acc +
        `
          <div id="${item.id}" class="book-info">${item.title}</div>
        `
      );
    }, "");

    this.searchResultHolder.innerHTML = booksHTML;
  }
}
