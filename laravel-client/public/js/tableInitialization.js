import { addPlayer } from './playerManagement.js';
import { createNewRoundRow, addNewRound, readyForANewRound, enableAddRoundButton, disableAddRoundButton } from './roundManagement.js';
import { initializeColumnDragging } from './playerDragable.js'
import { updateAllColumnTotals } from './scoreCalculation.js';
import { clearGameStateFromLocalStorage, saveCurrentGameState } from './gameState.js';

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
    // Use default players if:
    // 1. No gameState provided, OR
    // 2. gameState has no players array, OR  
    // 3. gameState has empty players array
    if (!gameState || !gameState.players || gameState.players.length === 0) {
        // Initialize with default players and no rounds

        // Step 1: Add default players
        const defaultPlayers = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
        defaultPlayers.forEach((playerName, index) => {
            addPlayer(playerName, index === 0); // Set the first player as the main player
        });

        // Step 2: Add an empty round (optional, depending on your logic)
        createNewRoundRow(); // Refactor `addNewRoundRow` to handle no scores passed
    } else {
        // If a game state is provided with players, initialize with the saved players and rounds
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
    }
        // If a game state is provided with players, initialize with the saved players and rounds
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
    document.getElementById('add-round-btn').addEventListener('click', () => addNewRound());
    document.getElementById('add-player-btn').addEventListener('click', () => addPlayer());
    
    // Add new game button event listener
    const newGameBtn = document.getElementById('new-game-btn');
    if (newGameBtn) {
        newGameBtn.addEventListener('click', () => startNewGame());
    }
}

/**
 * Starts a new game by clearing the table and localStorage
 */
export function startNewGame() {
    if (confirm('Are you sure you want to start a new game? This will clear all current progress.')) {
        // Clear localStorage
        clearGameStateFromLocalStorage();
        
        // Clear the table
        const roundsBody = document.getElementById('rounds-body');
        const playerRow = document.getElementById('player-row');
        const totalsRow = document.getElementById('totals-row');
        
        // Clear rounds
        roundsBody.innerHTML = '';
        
        // Clear players (keep the # header)
        while (playerRow.children.length > 1) {
            playerRow.removeChild(playerRow.lastChild);
        }
        
        // Clear totals (keep the "Total" header)
        while (totalsRow.children.length > 1) {
            totalsRow.removeChild(totalsRow.lastChild);
        }
        
        // Re-initialize with defaults
        initializeTable();
        
        // Save the initial state
        saveCurrentGameState();
    }
}
