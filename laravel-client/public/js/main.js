import { initializeTable, setupEventListeners } from './tableInitialization.js';
import { loadGameStateFromLocalStorage, saveCurrentGameState } from './gameState.js';

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to buttons and other interactive elements
    setupEventListeners();

    // Load saved game state from localStorage
    const savedGameState = loadGameStateFromLocalStorage();
    
    // Initialize the table with saved state or defaults
    initializeTable(savedGameState);
});
