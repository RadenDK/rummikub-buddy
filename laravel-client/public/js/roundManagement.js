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
