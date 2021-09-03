// Import stylesheets
import  "./style.css";

// Write Javascript code!
import { Api } from "./api.js";
import { BooksUI } from "./books-ui.js";

new BooksUI(new Api());
