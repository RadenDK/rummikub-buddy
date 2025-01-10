import { enableAddRoundButton } from './roundManagement.js';
import { saveGameStateToLocalStorage } from './gameState.js';


/**
 * Handles changes to a score cell.
 */
export function handleScoreChange(event) {
    const changedCell = event.target;
    const columnIndex = changedCell.cellIndex;
    const row = changedCell.parentElement;

    const rawValue = changedCell.textContent.trim();
    const numericValue = parseInt(rawValue, 10);

    if (isNaN(numericValue)) {
        changedCell.textContent = '0';
    } else if (numericValue > 0) {
        changedCell.textContent = `-${numericValue}`;
    }

    updateColumnTotal(columnIndex);
    calculateWinnerScore(row);
    saveGameStateToLocalStorage();
}

/**
 * Updates the total score for a column.
 */
export function updateColumnTotal(columnIndex) {
    const roundsBody = document.getElementById('rounds-body');
    const totalsRow = document.getElementById('totals-row');
    let columnTotal = 0;

    for (let row of roundsBody.rows) {
        const cell = row.cells[columnIndex];
        const cellValue = parseInt(cell.textContent, 10);
        if (!isNaN(cellValue)) {
            columnTotal += cellValue;
        }
    }

    totalsRow.cells[columnIndex].textContent = columnTotal;
}

/**
 * Updates the total for every player column.
 */
export function updateAllColumnTotals() {
    // The #player-row has all <th> columns, including the first one (#).
    // We want to skip the first <th>.
    const playerRow = document.getElementById('player-row');
    const totalColumns = playerRow.querySelectorAll('th').length - 1;
    // Example: if you have 4 players, totalColumns will be 4
    // Those columns will be indexed 1..4 in each row (index 0 is the “Round #”).

    for (let columnIndex = 1; columnIndex <= totalColumns; columnIndex++) {
        updateColumnTotal(columnIndex);
    }
}


/**
 * Calculates and sets the missing score for a row.
 */
export function calculateWinnerScore(row) {
    const cells = Array.from(row.cells).slice(1);
    let totalRowScore = 0;
    let zeroValueCell = null;
    let zeroCount = 0;

    for (let cell of cells) {
        const cellValue = parseInt(cell.textContent, 10);

        if (!isNaN(cellValue) && cellValue !== 0) {
            totalRowScore += cellValue;
        } else if (cellValue === 0) {
            zeroCount++;
            if (zeroCount === 1) {
                zeroValueCell = cell;
            } else {
                zeroValueCell = null;
                break;
            }
        }
    }

    if (zeroValueCell) {
        zeroValueCell.textContent = -totalRowScore;

        const columnIndex = zeroValueCell.cellIndex;
        updateColumnTotal(columnIndex);

        // enable the add round button since now all player scores have been filled out
        enableAddRoundButton()
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