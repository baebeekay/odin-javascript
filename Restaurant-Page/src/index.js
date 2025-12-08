import { createHomePage } from './home.js';
import { createMenuPage } from './menu.js';
import { createContactPage } from './contact.js';

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    createHomePage();
});

// Event listeners for navigation buttons
document.getElementById('home-btn').addEventListener('click', createHomePage);
document.getElementById('menu-btn').addEventListener('click', createMenuPage);
document.getElementById('contact-btn').addEventListener('click', createContactPage);
