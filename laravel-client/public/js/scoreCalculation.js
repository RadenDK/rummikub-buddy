import { enableAddRoundButton } from './roundManagement.js';
import { saveCurrentGameState } from './gameState.js';

/**
 * Handles changes to a score cell.
 */
export function handleScoreChange(event) {
    const changedCell = event.target;
    const columnIndex = changedCell.cellIndex;
    const row = changedCell.parentElement;

    const rawValue = changedCell.textContent.trim();
    const numericValue = parseInt(rawValue, 10);

    if (isWinnerCell(changedCell)) {
        // Do nothing if this is the winner cell
        return;
    }

    if (isNaN(numericValue)) {
        changedCell.textContent = '0';
        clearCellAttributes(changedCell);
    } else {
        // Automatically make the score negative for losers
        changedCell.textContent = numericValue > 0 ? `-${numericValue}` : numericValue;
        markAsLoserCell(changedCell);
    }

    updateColumnTotal(columnIndex);
    calculateWinnerScore(row);
    saveCurrentGameState();
}

/**
 * Checks if a cell is marked as a winner.
 */
function isWinnerCell(cell) {
    return cell.getAttribute('data-winner') === 'true';
}

/**
 * Marks a cell as a loser for styling purposes.
 */
function markAsLoserCell(cell) {
    cell.setAttribute('data-loser', 'true');
    cell.classList.add('loser-cell');
}

/**
 * Clears the winner or loser attributes and styles for a cell.
 */
function clearCellAttributes(cell) {
    cell.removeAttribute('data-winner');
    cell.removeAttribute('data-loser');
    cell.classList.remove('winner-cell', 'loser-cell');
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
    const playerRow = document.getElementById('player-row');
    const totalColumns = playerRow.querySelectorAll('th').length - 1;

    for (let columnIndex = 1; columnIndex <= totalColumns; columnIndex++) {
        updateColumnTotal(columnIndex);
    }
}

/**
 * Calculates and sets the missing score for a row.
 */
export function calculateWinnerScore(row) {
    const cells = Array.from(row.cells).slice(1); // Skip the first cell (round number)
    let totalRowScore = 0;
    let winnerCell = null;
    let zeroCount = 0;

    for (let cell of cells) {
        const cellValue = parseInt(cell.textContent, 10);
        clearCellAttributes(cell); // Clear any previous winner/loser status

        if (isNaN(cellValue)) {
            continue;
        }

        if (cellValue > 0) {
            if (winnerCell) {
                winnerCell = null;
                break;
            }
            winnerCell = cell;
        } else if (cellValue < 0) {
            totalRowScore += cellValue;
            markAsLoserCell(cell);
        } else if (cellValue === 0) {
            zeroCount++;
            if (zeroCount === 1) {
                winnerCell = cell;
            }
        }
    }

    if (zeroCount > 1) {
        winnerCell = null;
    }

    if (winnerCell) {
        winnerCell.textContent = -totalRowScore;
        winnerCell.setAttribute('data-winner', 'true');
        winnerCell.classList.add('winner-cell');

        const columnIndex = winnerCell.cellIndex;
        updateColumnTotal(columnIndex);
        enableAddRoundButton();
    }
}
