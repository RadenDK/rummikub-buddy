import { saveCurrentGameState } from './gameState.js';
import { createNewRoundScoreCell } from './roundManagement.js';

/**
 * Checks if the game has started (has any rounds with scores).
 */
function hasGameStarted() {
    const roundsBody = document.getElementById('rounds-body');
    return roundsBody.rows.length > 0;
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
    
    // Set up event listener for the "Add Player" button if it doesn't have one
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn && !addPlayerBtn.hasAttribute('data-listener-added')) {
        addPlayerBtn.addEventListener('click', () => addPlayer());
        addPlayerBtn.setAttribute('data-listener-added', 'true');
    }
}

/**
 * Creates a new player header.
 *
 * @param {string} playerName - The name of the player.
 * @param {boolean} mainPlayer - Whether this player is the main player.
 */


function createNameInput(playerName, mainPlayer) {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = playerName;
    nameInput.className = 'player-name-input';
    if (mainPlayer) {
        nameInput.disabled = true;
    } else {
        // Add event listener to save game state when name changes
        nameInput.addEventListener('blur', () => {
            // Only allow name changes if game hasn't started
            if (!hasGameStarted()) {
                saveCurrentGameState();
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
                if (!hasGameStarted()) {
                    saveCurrentGameState();
                }
                nameInput.blur();
            }
        });
        // Store original name for potential revert
        nameInput.setAttribute('data-original-name', playerName);
    }
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
    
    if (!nameInput.disabled) {
        wrapper.appendChild(createRemoveButton(playerHeader));
    }
    
    wrapper.appendChild(nameInput);
    return wrapper;
}




function addPlayerHeader(playerName, mainPlayer = false) {
    const playerRow = document.getElementById('player-row');
    const playerHeader = document.createElement('th');

    const nameInput = createNameInput(playerName, mainPlayer);

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
 */
export function restoreAddPlayerButton() {
    // Check if the add player button already exists
    const existingButton = document.getElementById('add-player-btn');
    if (existingButton) {
        return; // Button already exists, no need to restore
    }

    // Find the header row where the button should be placed
    const headerRow = document.querySelector('.header-row');
    if (!headerRow) {
        return; // Header row not found
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
