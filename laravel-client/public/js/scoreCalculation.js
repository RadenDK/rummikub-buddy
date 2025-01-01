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
    }
}
