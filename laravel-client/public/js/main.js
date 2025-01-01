import { initializeTable, setupEventListeners } from './tableInitialization.js';

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initializeTable(4);
});
