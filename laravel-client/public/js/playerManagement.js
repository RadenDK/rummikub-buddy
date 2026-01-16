import { saveCurrentGameState } from './gameState.js';
import { createNewRoundScoreCell } from './roundManagement.js';

/**
 * Checks if the game has started (more than 1 round exists).
 * The first round is the "setup" round where players can still be modified.
 * Game officially starts when the second round is added.
 */
function hasGameStarted() {
    const roundsBody = document.getElementById('rounds-body');
    return roundsBody.rows.length > 1;
}

/**
 * Adds a new player to the table.
 */
export function addPlayer(playerName = null, mainPlayer = false) {
    // Check if game has already started
    if (hasGameStarted()) {
        alert('Cannot add players after the game has started!');
        return;
    }

    const roundsBody = document.getElementById('rounds-body');
    const totalsRow = document.getElementById('totals-row');

    const playerRow = document.getElementById('player-row');
    const playerCount = playerRow.children.length - 1; // Exclude the # column
    const newPlayerNumber = playerCount + 1;

    // If no input is given, use the default player name
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
 * Creates an editable name input for a player.
 *
 * @param {string} playerName - The name of the player.
 * @returns {HTMLInputElement} - The name input element.
 */
function createNameInput(playerName) {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = playerName;
    nameInput.className = 'player-name-input';
    
    // Add event listener to save game state when name changes
    nameInput.addEventListener('blur', () => {
        // Only allow name changes if game hasn't started
        if (!hasGameStarted()) {
            saveCurrentGameState();
            // Update the original name to the new value for future reverts
            nameInput.setAttribute('data-original-name', nameInput.value);
        } else {
            // Revert to original name if game has started
            const originalName = nameInput.getAttribute('data-original-name');
            if (originalName) {
                nameInput.value = originalName;
            }
            alert('Cannot change player names after the game has started!');
        }
    });
    nameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            nameInput.blur();
        }
    });
    // Store original name for potential revert
    nameInput.setAttribute('data-original-name', playerName);
    
    return nameInput;
}

function createRemoveButton(playerHeader) {
    const removeButton = document.createElement('button');
    removeButton.textContent = '-';
    removeButton.className = 'remove-btn';
    removeButton.addEventListener('click', () => removePlayer(playerHeader));
    return removeButton;
}

function createSimpleWrapper(nameInput, playerHeader) {
    const wrapper = document.createElement('div');
    wrapper.className = 'player-wrapper';
    wrapper.appendChild(createRemoveButton(playerHeader));
    wrapper.appendChild(nameInput);
    return wrapper;
}

/**
 * Adds a player header to the table.
 *
 * @param {string} playerName - The name of the player.
 * @param {boolean} mainPlayer - Whether this player is the main player (cannot be removed).
 */
function addPlayerHeader(playerName, mainPlayer = false) {
    const playerRow = document.getElementById('player-row');
    const playerHeader = document.createElement('th');

    const nameInput = createNameInput(playerName);

    // Main player doesn't get a remove button, but can still edit their name
    if (!mainPlayer) {
        playerHeader.appendChild(createSimpleWrapper(nameInput, playerHeader));
    } else {
        playerHeader.appendChild(nameInput);
    }

    playerHeader.setAttribute('data-main-player', mainPlayer.toString());
    playerRow.appendChild(playerHeader);
}


/**
 * Removes a player from the table.
 */
export function removePlayer(playerHeader) {
    // Check if game has already started
    if (hasGameStarted()) {
        alert('Cannot remove players after the game has started!');
        return;
    }

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

    saveCurrentGameState();
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
 * Disables all player name inputs when game starts.
 */
export function disablePlayerNameInputs() {
    const nameInputs = document.querySelectorAll('.player-name-input:not([disabled])');
    nameInputs.forEach(input => {
        input.disabled = true;
    });
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

/**
 * Restores the "Add Player" button if it doesn't exist.
 * Also recreates the header-row container if it was removed.
 */
export function restoreAddPlayerButton() {
    // Check if the add player button already exists
    const existingButton = document.getElementById('add-player-btn');
    if (existingButton) {
        existingButton.disabled = false; // Ensure it's enabled
        return; // Button already exists, no need to restore
    }

    // Find the header row where the button should be placed
    let headerRow = document.querySelector('.header-row');
    
    // If header row doesn't exist (was removed), recreate it
    if (!headerRow) {
        const playersContainer = document.querySelector('.players-container');
        if (!playersContainer) {
            return; // Players container not found, cannot restore
        }
        
        // Create the header row container
        headerRow = document.createElement('div');
        headerRow.className = 'header-row';
        
        // Insert at the beginning of players-container
        playersContainer.insertBefore(headerRow, playersContainer.firstChild);
    }

    // Create the add player button
    const addPlayerBtn = document.createElement('button');
    addPlayerBtn.id = 'add-player-btn';
    addPlayerBtn.className = 'add-btn';
    addPlayerBtn.textContent = '+';

    // Add event listener
    addPlayerBtn.addEventListener('click', () => addPlayer());

    // Append the button to the header row
    headerRow.appendChild(addPlayerBtn);
}

/**
 * Enables all player name inputs (for new game).
 */
export function enablePlayerNameInputs() {
    const nameInputs = document.querySelectorAll('.player-name-input');
    nameInputs.forEach(input => {
        input.disabled = false;
    });
}
