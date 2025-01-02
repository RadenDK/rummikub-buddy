import { addPlayer } from './playerManagement.js';
import { addNewRoundRow } from './roundManagement.js';
import { initializeColumnDragging } from './playerDragable.js'

/**
 * Initializes the game table with the specified number of players and the first round.
 * 
 * @param {number} initialPlayerCount - The number of players to initialize the game with.
 */
export function initializeTable(initialPlayerCount = 4) {
    // Add the first round to the table
    addNewRoundRow();

    // Add the specified number of players to the table
    for (let i = 1; i <= initialPlayerCount; i++) {
        addPlayer();
    }

    // make it so that player columns are dragable
    initializeColumnDragging();
}

/**
 * Adds event listeners to DOM elements after the page has loaded.
 */
export function setupEventListeners() {
    document.getElementById('add-round-btn').addEventListener('click', addNewRoundRow);
    document.getElementById('add-player-btn').addEventListener('click', addPlayer);
}
