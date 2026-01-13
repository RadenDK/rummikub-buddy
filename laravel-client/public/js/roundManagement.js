import { removePlayerEditButtons } from './playerManagement.js';
import { handleScoreChange } from './scoreCalculation.js';
import { saveCurrentGameState } from './gameState.js';

/**
 * Adds a new round via the "Add Round" button.
 * This function ensures the DOM is updated and the game state is saved to local storage.
 */
export function addNewRound() {
    // Create a new round row with default scores
    createNewRoundRow();

    // Save the updated game state to local storage
    saveCurrentGameState();

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

    // Add keydown event listener for Enter key behavior
    scoreCell.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default Enter behavior (line break)
            // Simulate a Tab key press by moving focus to the next focusable element
            const nextElement = getNextFocusableElement(scoreCell);
            nextElement?.focus(); // Focus the next element, if it exists
        }
    });
    

    return scoreCell;
}

/**
 * Finds the next focusable element in the DOM after the given element.
 * 
 * @param {HTMLElement} currentElement - The current element.
 * @returns {HTMLElement|null} - The next focusable element or null if none exists.
 */
function getNextFocusableElement(currentElement) {
    const focusableSelectors = 'input, button, [contenteditable="true"], select, textarea, a[href]';
    const allFocusable = Array.from(document.querySelectorAll(focusableSelectors));
    const currentIndex = allFocusable.indexOf(currentElement);

    if (currentIndex >= 0 && currentIndex < allFocusable.length - 1) {
        return allFocusable[currentIndex + 1];
    }
    return null;
}



// Helper function to disable the Add Round button
export function disableAddRoundButton() {
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


/**
 * Checks if the current round row is ready for a new round.
 * If any cell in the current round row contains a 0, it returns false.
 * Otherwise, it returns true.
 * 
 * @returns {boolean} - True if ready for a new round, false otherwise.
 */
export function readyForANewRound() {
    const roundsBody = document.getElementById('rounds-body');
    const lastRoundRow = roundsBody.rows[roundsBody.rows.length - 1];

    if (!lastRoundRow) {
        return true; // No rounds present, ready for a new round
    }

    const cells = Array.from(lastRoundRow.cells).slice(1); // Skip the round number cell
    for (let cell of cells) {
        if (parseInt(cell.textContent.trim(), 10) === 0) {
            return false;
        }
    }

    return true;
}