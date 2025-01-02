import { initializeTable, setupEventListeners } from './tableInitialization.js';
import { initializeModalWindow } from './modalWindow.js';

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initializeTable(4);
    initializeModalWindow();
});
