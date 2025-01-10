import { initializeTable, setupEventListeners } from './tableInitialization.js';
import { initializeModalWindow } from './finishGameModalWindow.js';
import { loadGameStateFromLocalStorage } from './gameState.js';

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to buttons and other interactive elements
    setupEventListeners();

    // Attempt to load the game state from local storage
    const gameState = loadGameStateFromLocalStorage();

    // If a saved game state exists, initialize the table with it
    if (gameState) {
        initializeTable(gameState);
    } else {
        // Initialize a new game with the default number of players
        initializeTable(); // No game state provided, so initialize with defaults
    }

    // Set up the modal window functionality
    initializeModalWindow();
});
