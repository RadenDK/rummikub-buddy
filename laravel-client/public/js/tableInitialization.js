import { addPlayer } from './playerManagement.js';
import { createNewRoundRow, addNewRound, readyForANewRound, enableAddRoundButton, disableAddRoundButton } from './roundManagement.js';
import { initializeColumnDragging } from './playerDragable.js'
import { updateAllColumnTotals } from './scoreCalculation.js';

/**
 * Initializes the game table based on the provided game state.
 * If no game state is provided, initializes a default table with four players and no rounds.
 * 
 * @param {Object|null} gameState - The game state containing players and rounds, or null.
 * The gameState object should have the following structure:
 * {
 *   players: [{ name: "Player 1", isMain: true }, { name: "Player 2", isMain: false }, ...],
 *   rounds: [[10, -10, 0], [5, -5, 0]] // Each sub-array represents a round's scores
 * }
 */
export function initializeTable(gameState = null) {
    if (gameState) {
        // If a game state is provided, initialize with the saved players and rounds
        const { players, rounds } = gameState;

        // Step 1: Add players
        players.forEach((player, index) => {
            const isMainPlayer = player.isMain || false; // Check if the player is the main player
            addPlayer(player.name, isMainPlayer);
        });

        // Step 2: Add existing rounds
        rounds.forEach(round => {
            createNewRoundRow(round); // Refactor `addNewRoundRow` to accept scores for the round
        });

        updateAllColumnTotals(); // Update the column totals after loading the game state
    } else {
        // If no game state is provided, initialize with default players and no rounds

        // Step 1: Add default players
        const defaultPlayers = [googleFirstName, 'Player 2', 'Player 3', 'Player 4'];
        defaultPlayers.forEach((playerName, index) => {
            addPlayer(playerName, index === 0); // Set the first player as the main player
        });

        // Step 2: Add an empty round (optional, depending on your logic)
        createNewRoundRow(); // Refactor `addNewRoundRow` to handle no scores passed
    }

    if (readyForANewRound()) {
        enableAddRoundButton();
    } else {
        disableAddRoundButton();
    }

    // Step 3: Make player columns draggable
    initializeColumnDragging();
}


/**
 * Adds event listeners to DOM elements after the page has loaded.
 */
export function setupEventListeners() {
    document.getElementById('add-round-btn').addEventListener('click', addNewRound);
    document.getElementById('add-player-btn').addEventListener('click', addPlayer);
}
