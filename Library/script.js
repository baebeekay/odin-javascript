
const myLibrary = [];
const booksGrid = document.querySelector('.books-grid');
const newBookBtn = document.querySelector('.add-book-btn');
const newBookDialog = document.getElementById('newBookDialog');
const newBookForm = document.getElementById('newBookForm');
const closeBtn = document.querySelector('.close-btn');

// Book class with a method to toggle read status
class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID(); // Assign a unique ID to each book
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // Prototype function to toggle the 'read' status
    toggleReadStatus() {
        this.read = !this.read;
    }
}

// Function to add a new book to the library array
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to remove a book from the library
function removeBookFromLibrary(bookId) {
    const indexToRemove = myLibrary.findIndex(book => book.id === bookId);
    if (indexToRemove !== -1) {
        myLibrary.splice(indexToRemove, 1);
        displayBooks();
    }
}

// Function to loop through the array and display each book on the page
function displayBooks() {
    // Clear existing content to prevent duplicates
    booksGrid.innerHTML = '';

    myLibrary.forEach(book => {
        // Create a div for the book card
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id); // Associate the DOM element with the book's ID

        // Create the HTML content for the card
        bookCard.innerHTML = `
            <div>
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
                <p>${book.pages} pages</p>
            </div>
            <div class="card-actions">
                <button class="read-btn ${book.read ? '' : 'not-read'}" data-id="${book.id}">
                    ${book.read ? 'Read' : 'Not Read'}
                </button>
                <button class="remove-btn" data-id="${book.id}">Remove</button>
            </div>
        `;

        // Append the new card to the grid
        booksGrid.appendChild(bookCard);
    });
}

// Manually add a few books to get started
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310, false);
const theMartian = new Book('The Martian', 'Andy Weir', 384, true);
const leviathanWakes = new Book('Leviathan Wakes', 'James S.A. Corey', 592, true);

myLibrary.push(theHobbit, theMartian, leviathanWakes);

// --- Event Listeners ---

// Show the dialog when the "New Book" button is clicked
newBookBtn.addEventListener('click', () => {
    newBookDialog.showModal();
});

// Hide the dialog when the "Cancel" button is clicked
closeBtn.addEventListener('click', () => {
    newBookDialog.close();
    newBookForm.reset(); // Reset form fields on close
});

// Handle the form submission
newBookForm.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    // Get the values from the form inputs
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    // Add the new book to the library
    addBookToLibrary(title, author, pages, read);

    // Close the dialog and reset the form
    newBookDialog.close();
    newBookForm.reset();
});

// Use event delegation on the grid container for dynamically created buttons
booksGrid.addEventListener('click', (event) => {
    const target = event.target;
    const bookId = target.dataset.id;
    
    if (target.classList.contains('remove-btn')) {
        // Remove the book if the "Remove" button was clicked
        removeBookFromLibrary(bookId);
    } else if (target.classList.contains('read-btn')) {
        // Find the book object by its ID
        const bookToToggle = myLibrary.find(book => book.id === bookId);
        if (bookToToggle) {
            // Call the prototype function to toggle its read status
            bookToToggle.toggleReadStatus();
            // Re-render the library to update the button text and style
            displayBooks();
        }
    }
});

// Initial display of books when the page loads
displayBooks();
