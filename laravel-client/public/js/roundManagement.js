import { removePlayerEditButtons } from './playerManagement.js';
import { handleScoreChange } from './scoreCalculation.js';
import { saveGameStateToLocalStorage } from './gameState.js';

/**
 * Adds a new round via the "Add Round" button.
 * This function ensures the DOM is updated and the game state is saved to local storage.
 */
export function addNewRound() {
    // Create a new round row with default scores
    createNewRoundRow();

    // Save the updated game state to local storage
    saveGameStateToLocalStorage();

    // Disable the Add Round button
    disableAddRoundButton();
}

/**
 * Creates a new round row in the table.
 * This function is reusable for both user-triggered and programmatic round additions.
 * 
 * @param {Array|null} round - An array of scores for the new round (e.g., [10, -10, 0]).
 * If null, initializes the round with default scores (e.g., 0 for all players).
 */
export function createNewRoundRow(round = null) {
    const roundsBody = document.getElementById('rounds-body');
    const nextRoundCount = roundsBody.rows.length + 1;

    // Create a new row for the round
    const newRow = document.createElement('tr');

    // Add the round number as the first cell
    const roundNumberCell = document.createElement('td');
    roundNumberCell.textContent = nextRoundCount;
    newRow.appendChild(roundNumberCell);

    // Get the current number of players
    const playerCount = document.querySelectorAll('#player-row th').length - 1;

    // Add a score cell for each player
    for (let i = 0; i < playerCount; i++) {
        const score = round && round[i] !== undefined ? round[i] : 0;
        const scoreCell = createNewRoundScoreCell(score);
        newRow.appendChild(scoreCell);
    }

    // Append the new row to the rounds table body
    roundsBody.appendChild(newRow);

    // Remove player edit buttons if more than one round exists
    if (nextRoundCount > 1) {
        removePlayerEditButtons();
    }
}

/**
 * Creates a new editable score cell for a round.
 * 
 * @param {number} score - The initial score for the cell. Defaults to 0.
 * @returns {HTMLTableCellElement} - The newly created score cell.
 */
export function createNewRoundScoreCell(score = 0) {
    const scoreCell = document.createElement('td');
    scoreCell.textContent = score; // Set the initial score value
    scoreCell.setAttribute('contenteditable', 'true'); // Allow the user to edit the score
    scoreCell.addEventListener('focusout', handleScoreChange); // Attach the score change handler
    return scoreCell;
}

// Helper function to disable the Add Round button
function disableAddRoundButton() {
    const addRoundButton = document.getElementById('add-round-btn');
    if (addRoundButton) {
        addRoundButton.disabled = true;
        addRoundButton.classList.add('disabled'); // Optional: Add a CSS class to style the disabled state
    }
}

// Helper function to enable the Add Round button
export function enableAddRoundButton() {
    const addRoundButton = document.getElementById('add-round-btn');
    if (addRoundButton) {
        addRoundButton.disabled = false;
        addRoundButton.classList.remove('disabled'); // Optional: Remove the CSS class
    }
}
