document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners
    document.getElementById('add-round-btn').addEventListener('click', addNewRoundRow);
    document.getElementById('add-player-btn').addEventListener('click', addPlayer);
    initializeTable(4);
});


/**
 * Initializes the game table with the specified number of players and the first round.
 * - Adds the first round to the table.
 * - Adds the specified number of players to the table, including their headers, scores, and totals.
 * 
 * @param {number} initialPlayerCount - The number of players to initialize the game with (default is 4).
 */
function initializeTable(initialPlayerCount = 4) {
    // Add the first round to the table
    addNewRoundRow();

    // Add the specified number of players to the table
    for (let i = 1; i <= initialPlayerCount; i++) {
        addPlayer();
    }
}


/**
 * Adds a new player to the game.
 * - Updates the header row with the new player's name.
 * - Adds a new score column for the player in all existing rounds.
 * - Adds a new total score cell for the player in the footer row.
 */
function addPlayer() {
    const roundsBody = document.getElementById('rounds-body');
    const totalsRow = document.getElementById('totals-row');

    // Determine the current number of players
    const playerRow = document.getElementById('player-row');
    const playerCount = playerRow.children.length - 1; // Exclude the # column
    const newPlayerNumber = playerCount + 1;

    // Add a new header cell for the player
    addPlayerHeader(`Player ${newPlayerNumber}`);

    // Add a score cell for the new player in each existing round
    for (let row of roundsBody.rows) {
        const newCell = createNewRoundScoreCell();
        row.appendChild(newCell);
    }

    // Add a total score cell for the new player in the footer row
    const newTotalCell = document.createElement('td');
    newTotalCell.textContent = '0';
    totalsRow.appendChild(newTotalCell);

    // Disable the "Add Player" button if the max number of players is reached
    const maxPlayers = 6;
    if (newPlayerNumber >= maxPlayers) {
        disableAddPlayerButton();
    }
}



/**
 * Creates a new player header in the table.
 * - Displays the player's name.
 * - Adds a remove button to allow the player to be removed.
 * 
 * @param {string} playerName - The name of the player to be added.
 */
function addPlayerHeader(playerName) {
    const playerRow = document.getElementById('player-row'); // Header row
    const playerHeader = document.createElement('th');

    // Add player name
    const nameSpan = document.createElement('span');
    nameSpan.textContent = playerName;
    playerHeader.appendChild(nameSpan);

    // Add remove button with a unique ID
    const removeButton = document.createElement('button');
    removeButton.textContent = '-';
    removeButton.className = 'remove-btn';
    removeButton.id = `remove-btn-${playerName.replace(/\s+/g, '-').toLowerCase()}`;
    removeButton.addEventListener('click', () => removePlayer(playerHeader));
    playerHeader.appendChild(removeButton);

    // Append the new player header at the end of the row
    playerRow.appendChild(playerHeader);
}





/**
 * Removes a player from the game.
 * - Removes the player's header from the table.
 * - Deletes the player's score column from all existing rounds.
 * - Deletes the player's total score from the footer.
 * - Re-enables the "Add Player" button if it was disabled.
 * 
 * @param {HTMLElement} playerHeader - The header cell of the player to be removed.
 */
function removePlayer(playerHeader) {
    const playerIndex = Array.from(playerHeader.parentNode.children).indexOf(playerHeader); // Get the column index
    const playerRow = document.getElementById('player-row'); // Header row
    const roundsBody = document.getElementById('rounds-body'); // Rounds table body
    const totalsRow = document.getElementById('totals-row'); // Footer row

    // Remove player header
    playerRow.removeChild(playerHeader);

    // Remove the player's column from each row in the rounds body
    for (let row of roundsBody.rows) {
        row.deleteCell(playerIndex);
    }

    // Remove the player's total score cell in the footer
    totalsRow.deleteCell(playerIndex);

    // Make sure to enable the add player button again
    enableAddPlayerButton();
}



/**
 * Adds a new round to the table.
 * - Creates a new row for the round.
 * - Adds a round number to the row.
 * - Adds a score cell for each player in the round.
 */
function addNewRoundRow() {
    const roundsBody = document.getElementById('rounds-body');
    const nextRoundCount = roundsBody.rows.length + 1;

    // Create a new row
    const newRow = document.createElement('tr');

    // Add the round number to the new row
    const roundNumberCell = document.createElement('td');
    roundNumberCell.textContent = nextRoundCount;
    newRow.appendChild(roundNumberCell);

    // Add a score cell for each player
    const playerCount = document.querySelectorAll('#player-row th').length - 1; // Exclude the # column
    for (let i = 0; i < playerCount; i++) {
        const scoreCell = createNewRoundScoreCell();
        newRow.appendChild(scoreCell);
    }

    // Append the new row to the rounds body
    roundsBody.appendChild(newRow);

    // If the round count is higher than one, remove player edit buttons
    if (nextRoundCount > 1) {
        removePlayerEditButtons();
    }
}



/**
 * Creates a new editable score cell for a round.
 * - Initializes the cell with a default score of 0.
 * - Makes the cell content editable.
 * - Adds an event listener to handle score changes.
 * - Ensures only numeric values can be entered.
 * 
 * @returns {HTMLElement} - The newly created score cell.
 */
function createNewRoundScoreCell() {
    const scoreCell = document.createElement('td');
    scoreCell.textContent = '0'; // Default score
    scoreCell.setAttribute('contenteditable', 'true'); // Make the new cells editable

    // Add input listener to handle changes
    scoreCell.addEventListener('focusout', handleScoreChange);

    // Restrict non-numeric input
    scoreCell.addEventListener('keypress', restrictNonNumericInput);

    return scoreCell;
}

/**
 * Restricts non-numeric input in score cells.
 * Allows only digits, minus sign, and backspace.
 * 
 * @param {KeyboardEvent} event - The keypress event.
 */
function restrictNonNumericInput(event) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', '-'];
    const isNumber = /^[0-9]$/.test(event.key);

    if (!isNumber && !allowedKeys.includes(event.key)) {
        event.preventDefault(); // Block invalid keys
    }
}


/**
 * Handles changes to a score cell.
 * - Ensures the input value is numeric.
 * - Automatically converts the value to negative if it's positive.
 * - Updates the total for the column.
 * - Calculates and sets the missing score for the row.
 * 
 * @param {Event} event - The input event triggered when the score changes.
 */
function handleScoreChange(event) {
    const changedCell = event.target; // The cell that was changed
    const columnIndex = changedCell.cellIndex; // Index of the changed column
    const row = changedCell.parentElement; // The row where the change occurred

    // Validate the input and ensure it's a number
    const rawValue = changedCell.textContent.trim();
    const numericValue = parseInt(rawValue, 10);

    if (isNaN(numericValue)) {
        // If not a valid number, reset the cell to 0
        changedCell.textContent = '0';
    } else {
        // Ensure the value is negative
        if (numericValue > 0) {
            changedCell.textContent = `-${numericValue}`;
        } else {
            changedCell.textContent = `${numericValue}`;
        }
    }

    // Update the column total
    updateColumnTotal(columnIndex);

    // Calculate and set the winner's score for the row
    calculateWinnerScore(row);
}


/**
 * Updates the total score for a column in the footer row.
 * 
 * @param {number} columnIndex - The index of the column to update.
 */
function updateColumnTotal(columnIndex) {
    const roundsBody = document.getElementById('rounds-body');
    const totalsRow = document.getElementById('totals-row');
    let columnTotal = 0;

    // Sum all the values in the column
    for (let row of roundsBody.rows) {
        const cell = row.cells[columnIndex];
        const cellValue = parseInt(cell.textContent, 10);
        if (!isNaN(cellValue)) {
            columnTotal += cellValue;
        }
    }

    // Update the total in the footer row
    const totalCell = totalsRow.cells[columnIndex];
    totalCell.textContent = columnTotal;
}

/**
 * Calculates the total score for the row and automatically sets the score 
 * for the player whose cell has a value of 0 if only one cell is 0.
 * Stops processing after finding the second player with a score of 0.
 * 
 * @param {HTMLTableRowElement} row - The table row to process.
 */
function calculateWinnerScore(row) {
    const cells = Array.from(row.cells).slice(1); // Skip the first cell (round number)
    let totalRowScore = 0;
    let zeroValueCell = null;
    let zeroCount = 0;

    // Loop through all player cells in the row
    for (let cell of cells) {
        const cellValue = parseInt(cell.textContent, 10);

        if (!isNaN(cellValue) && cellValue !== 0) {
            // Add the cell value to the total row score if it's not 0
            totalRowScore += cellValue;
        } else if (cellValue === 0) {
            zeroCount++; // Increment the count of zero-value cells
            if (zeroCount === 1) {
                zeroValueCell = cell; // First zero-value cell
            } else {
                // Stop processing if a second zero-value cell is found
                zeroValueCell = null;
                break;
            }
        }
    }

    // If only one cell has a value of 0, set it to the row's total score
    if (zeroValueCell) {
        zeroValueCell.textContent = totalRowScore * -1;

        // Call updateColumnTotal for the updated column
        const columnIndex = zeroValueCell.cellIndex;
        updateColumnTotal(columnIndex);
    }
}




/**
 * Disables the "Add Player" button.
 * - Prevents users from adding more players.
 */
function disableAddPlayerButton() {
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.disabled = true; // Disable the button
    }
}

/**
 * Enables the "Add Player" button.
 * - Allows users to add more players.
 */
function enableAddPlayerButton() {
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.disabled = false; // Enable the button
    }
}

/**
 * Removes the "Add Player" button and all "Remove Player" buttons from the table.
 */
function removePlayerEditButtons() {
    // Remove the "Add Player" button
    const addPlayerButton = document.getElementById('add-player-btn');
    if (addPlayerButton) {
        addPlayerButton.parentElement.remove(); // Remove the entire <th> containing the button
    }

    // Remove all "Remove Player" buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => button.remove());
}
