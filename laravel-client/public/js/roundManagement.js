import { removePlayerEditButtons } from './playerManagement.js';
import { handleScoreChange } from './scoreCalculation.js';



/**
 * Adds a new round to the table.
 */
export function addNewRoundRow() {
    const roundsBody = document.getElementById('rounds-body');
    const nextRoundCount = roundsBody.rows.length + 1;

    const newRow = document.createElement('tr');
    const roundNumberCell = document.createElement('td');
    roundNumberCell.textContent = nextRoundCount;
    newRow.appendChild(roundNumberCell);

    const playerCount = document.querySelectorAll('#player-row th').length - 1;

    for (let i = 0; i < playerCount; i++) {
        const scoreCell = createNewRoundScoreCell();
        newRow.appendChild(scoreCell);
    }

    roundsBody.appendChild(newRow);

    if (nextRoundCount > 1) {
        removePlayerEditButtons();
    }

    // Disable the Add Round button after adding a new round
    disableAddRoundButton();
}

/**
 * Creates a new editable score cell for a round.
 */
export function createNewRoundScoreCell() {
    const scoreCell = document.createElement('td');
    scoreCell.textContent = '0';
    scoreCell.setAttribute('contenteditable', 'true');
    scoreCell.addEventListener('focusout', handleScoreChange);
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