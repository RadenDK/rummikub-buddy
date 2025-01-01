// Add a listener on the add round button on clicking
document.getElementById('add-round-btn').addEventListener('click', addRound);

// Add listner on add player button
document.getElementById('add-player-btn').addEventListener('click', addPlayer);

// Add a listener on all cells in the rounds table to check if a score has changed 
document.querySelectorAll('#rounds-body td').forEach(cell => {
    cell.addEventListener('input', handleScoreChange);
});



function addRound() {
    const roundsBody = document.getElementById('rounds-body');
    const nextRoundCount = roundsBody.rows.length + 1;

    // Create a new row
    const newRow = document.createElement('tr');

    // Add the round number to the new row
    const roundNumberCell = document.createElement('td');
    roundNumberCell.textContent = nextRoundCount;
    newRow.appendChild(roundNumberCell);

    // Add columns with initial value of 0 to the columns of the new row
    const playerCount = document.querySelectorAll('#player-row th').length - 2; // -2 to exclude rounds and the add button

    for (let i = 0; i < playerCount; i++) {
        const scoreCell = createNewRoundScoreCell();
        newRow.appendChild(scoreCell);
    }

    // Append the new row to the rounds body
    roundsBody.appendChild(newRow);

    disableAddPlayerButton(); // Disable the add player button since now the match has started
}

function addPlayer() {
    // Get the rounds body element
    const roundsBody = document.getElementById('rounds-body');

    // 2. Add a player to the columns of the rounds table
    const playerRow = document.getElementById('player-row'); // Header row
    const playerCount = playerRow.children.length - 2; // Exclude # and Add Player button
    const newPlayerNumber = playerCount + 1;

    // Create a new header cell for the new player
    const newPlayerHeader = document.createElement('th');
    newPlayerHeader.textContent = `Player ${newPlayerNumber}`;
    playerRow.insertBefore(newPlayerHeader, playerRow.lastElementChild); // Add before the Add Player button cell

    // 3. Add new col for the initial round and score
    for (let row of roundsBody.rows) {
        const newCell = createNewRoundScoreCell();
        row.appendChild(newCell); // Add the new cell to the end of the row
    }

    // 5. Add a new total cell in the footer row
    const totalsRow = document.getElementById('totals-row');
    const newTotalCell = document.createElement('td');
    newTotalCell.textContent = '0'; // Initial total for the new player
    totalsRow.appendChild(newTotalCell);

    // 4. Check if the player count has hit the limit
    const maxPlayers = 6; // Set the maximum number of players allowed
    if (newPlayerNumber >= maxPlayers) {
        disableAddPlayerButton();
    }
}

function createNewRoundScoreCell() {
    const scoreCell = document.createElement('td');
    scoreCell.textContent = '0'; // Default score
    scoreCell.setAttribute('contenteditable', 'true'); // make the new cells editable
    scoreCell.addEventListener('input', handleScoreChange); // add listenser to the new cells
    return scoreCell;
}


function disableAddPlayerButton() {
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.disabled = true; // Disable the button
    }
}

function enableAddPlayerButton() {
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.disabled = false; // Enable the button
    }
}




function handleScoreChange(event) {
    // get the cell that has been changed
    const changedCell = event.target;

    const columnIndex = changedCell.cellIndex;

    const roundsBody = document.getElementById('rounds-body');
    let totalScore = 0;

    // get the sum of all the cells in the column
    for (let row of roundsBody.rows) {
        const cell = row.cells[columnIndex];
        const cellValue = parseInt(cell.textContent, 10);
        if (!isNaN(cellValue)) {
            totalScore += cellValue;
        }
    }

    const totalsRow = document.getElementById('totals-row');
    const totalCell = totalsRow.cells[columnIndex];
    totalCell.textContent = totalScore;
}


