import { saveGameStateToLocalStorage } from './gameState.js';
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
let selectedPlayers = new Set();

function createNameInput(playerName, mainPlayer) {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = playerName;
    nameInput.className = 'player-name-input';
    if (mainPlayer) {
        nameInput.disabled = true;
    }
    return nameInput;
}

function createComboWrapper(nameInput, playerHeader) {
    const comboWrapper = document.createElement('div');
    comboWrapper.className = 'combo-wrapper';

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'combo-toggle';
    toggleButton.innerHTML = '▼';

    const dropdown = document.createElement('div');
    dropdown.className = 'combo-dropdown';

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(toggleButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = '-';
    removeButton.className = 'remove-btn';
    removeButton.addEventListener('click', () => {
        if (nameInput.dataset.playerId) {
            selectedPlayers.delete(nameInput.dataset.playerId);
        }
        removePlayer(playerHeader);
        updateAllDropdowns();
    });
    buttonContainer.appendChild(removeButton);

    function refreshDropdownOptions() {
        dropdown.innerHTML = '';

        priorUsedPlayers.forEach(player => {
            const option = document.createElement('div');
            option.className = 'combo-option';
            option.textContent = player.name;
            option.setAttribute('data-id', player.id);

            // Disable if player is already selected and is not the current input
            if (selectedPlayers.has(player.id) && nameInput.dataset.playerId !== player.id) {
                option.classList.add('disabled-option');
                option.style.pointerEvents = 'none';
            } else {
                option.classList.remove('disabled-option');
                option.style.pointerEvents = 'auto';
                option.addEventListener('click', () => handlePlayerSelection(nameInput, player.id, player.name, dropdown));
            }
            dropdown.appendChild(option);
        });
    }

    toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        refreshDropdownOptions();
    });
    document.addEventListener('click', () => dropdown.style.display = 'none');

    comboWrapper.append(nameInput, buttonContainer, dropdown);
    refreshDropdownOptions();
    return comboWrapper;
}

function handlePlayerSelection(nameInput, playerId, playerName, dropdown) {
    const oldPlayerId = nameInput.dataset.playerId;

    // If the player was previously selected, remove them from the selectedPlayers set
    if (oldPlayerId && selectedPlayers.has(oldPlayerId)) {
        selectedPlayers.delete(oldPlayerId);
    }

    // Update the input field and dataset
    nameInput.value = playerName;
    nameInput.dataset.playerId = playerId;

    // Mark the new player as selected
    selectedPlayers.add(playerId);

    dropdown.style.display = 'none';

    // Ensure all dropdowns update correctly
    updateAllDropdowns();
}


function addPlayerHeader(playerName, mainPlayer = false) {
    const playerRow = document.getElementById('player-row');
    const playerHeader = document.createElement('th');

    const nameInput = createNameInput(playerName, mainPlayer);

    if (!mainPlayer) {
        playerHeader.appendChild(createComboWrapper(nameInput, playerHeader));
    } else {
        playerHeader.appendChild(nameInput);
    }

    playerHeader.setAttribute('data-main-player', mainPlayer.toString());
    playerRow.appendChild(playerHeader);
}


function updateAllDropdowns() {
    // Rebuild the set of currently selected player IDs
    selectedPlayers.clear();
    document.querySelectorAll('.player-name-input').forEach(input => {
        if (input.dataset.playerId) {
            selectedPlayers.add(input.dataset.playerId);
        }
    });

    document.querySelectorAll('.combo-wrapper').forEach(wrapper => {
        const dropdown = wrapper.querySelector('.combo-dropdown');
        const nameInput = wrapper.querySelector('.player-name-input');

        dropdown.innerHTML = ''; // Clear existing options to rebuild

        priorUsedPlayers.forEach(player => {
            const option = document.createElement('div');
            option.className = 'combo-option';
            option.textContent = player.name;
            option.setAttribute('data-id', player.id);

            // Ensure only players currently selected by OTHER inputs are disabled
            if (selectedPlayers.has(player.id) && nameInput.dataset.playerId !== player.id) {
                option.classList.add('disabled-option');
                option.style.pointerEvents = 'none';
            } else {
                option.classList.remove('disabled-option');
                option.style.pointerEvents = 'auto';
                option.addEventListener('click', () => handlePlayerSelection(nameInput, player.id, player.name, dropdown));
            }

            dropdown.appendChild(option);
        });
    });
}


/**
 * Removes a player from the table.
 */
export function removePlayer(playerHeader) {
    const playerIndex = Array.from(playerHeader.parentNode.children).indexOf(playerHeader);
    const nameInput = playerHeader.querySelector('.player-name-input');

    // Remove from selectedPlayers if it exists
    if (nameInput && nameInput.dataset.playerId) {
        selectedPlayers.delete(nameInput.dataset.playerId);
    }

    const playerRow = document.getElementById('player-row');
    const roundsBody = document.getElementById('rounds-body');
    const totalsRow = document.getElementById('totals-row');

    playerRow.removeChild(playerHeader);

    for (let row of roundsBody.rows) {
        row.deleteCell(playerIndex);
    }

    totalsRow.deleteCell(playerIndex);

    enableAddPlayerButton();
    updateAllDropdowns(); // Ensure all dropdowns update

    saveGameStateToLocalStorage();
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
