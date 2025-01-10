import { createNewRoundScoreCell } from './roundManagement.js';

/**
 * Adds a new player to the table.
 */
export function addPlayer(playerName = null, mainPlayer = false) {
    const roundsBody = document.getElementById('rounds-body');
    const totalsRow = document.getElementById('totals-row');

    const playerRow = document.getElementById('player-row');
    const playerCount = playerRow.children.length - 1; // Exclude the # column
    const newPlayerNumber = playerCount + 1;


    // if no input is given, use the default player name
    if (playerName === null) {
        playerName = `Player ${newPlayerNumber}`;
    }

    addPlayerHeader(playerName, mainPlayer);

    for (let row of roundsBody.rows) {
        const newCell = createNewRoundScoreCell();
        row.appendChild(newCell);
    }

    const newTotalCell = document.createElement('td');
    newTotalCell.textContent = '0';
    totalsRow.appendChild(newTotalCell);

    if (newPlayerNumber >= 6) {
        disableAddPlayerButton();
    }
}

/**
 * Creates a new player header.
 * 
 * @param {string} playerName - The name of the player.
 * @param {boolean} mainPlayer - Whether this player is the main player.
 */
export function addPlayerHeader(playerName, mainPlayer = false) {
    const playerRow = document.getElementById('player-row');
    const playerHeader = document.createElement('th');

    // Add a data attribute to indicate if this is the main player
    if (mainPlayer) {
        playerHeader.setAttribute('data-main-player', 'true');
    } else {
        playerHeader.setAttribute('data-main-player', 'false');
    }

    // Create an input for the player's name
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = playerName;
    nameInput.className = 'player-name-input';
    if (mainPlayer) {
        nameInput.disabled = true; // Disable editing for the main player
    }
    playerHeader.appendChild(nameInput);

    // If not the main player, add a remove button
    if (!mainPlayer) {
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', () => removePlayer(playerHeader));
        playerHeader.appendChild(removeButton);
    }

    playerRow.appendChild(playerHeader);
}


/**
 * Removes a player from the table.
 */
export function removePlayer(playerHeader) {
    const playerIndex = Array.from(playerHeader.parentNode.children).indexOf(playerHeader);
    const playerRow = document.getElementById('player-row');
    const roundsBody = document.getElementById('rounds-body');
    const totalsRow = document.getElementById('totals-row');

    playerRow.removeChild(playerHeader);

    for (let row of roundsBody.rows) {
        row.deleteCell(playerIndex);
    }

    totalsRow.deleteCell(playerIndex);

    enableAddPlayerButton();
}

/**
 * Disables the "Add Player" button.
 */
export function disableAddPlayerButton() {
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.disabled = true;
    }
}

/**
 * Enables the "Add Player" button.
 */
export function enableAddPlayerButton() {
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.disabled = false;
    }
}

/**
 * Removes the "Add Player" button and all "Remove Player" buttons from the table.
 */
export function removePlayerEditButtons() {
    const addPlayerButton = document.getElementById('add-player-btn');
    if (addPlayerButton) {
        addPlayerButton.parentElement.remove();
    }

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button) => button.remove());
}
