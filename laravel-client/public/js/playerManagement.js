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

export function addPlayerHeader(playerName, mainPlayer = false) {
    const playerRow = document.getElementById('player-row');
    const playerHeader = document.createElement('th');

    if (mainPlayer) {
        // Main player code remains the same
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = playerName;
        nameInput.className = 'player-name-input';
        nameInput.disabled = true;
        playerHeader.appendChild(nameInput);
    } else {
        const comboWrapper = document.createElement('div');
        comboWrapper.className = 'combo-wrapper';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = playerName;
        nameInput.className = 'player-name-input';

        // Find the player ID for the initial value
        const initialPlayer = priorUsedPlayers.find(p => p.name === playerName);
        if (initialPlayer) {
            nameInput.dataset.playerId = initialPlayer.id;
            selectedPlayers.add(initialPlayer.id);
        }

        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'combo-toggle';
        toggleButton.innerHTML = '▼';

        const dropdown = document.createElement('div');
        dropdown.className = 'combo-dropdown';

        // Create and update dropdown options
        function refreshDropdownOptions() {
            dropdown.innerHTML = '';  // Clear existing options
            priorUsedPlayers.forEach(player => {
                const option = document.createElement('div');
                option.className = 'combo-option';
                option.textContent = player.name;
                option.setAttribute('data-id', player.id);

                if (selectedPlayers.has(player.id) && nameInput.dataset.playerId !== player.id) {
                    option.classList.add('disabled-option');
                    option.style.pointerEvents = 'none';
                } else {
                    option.addEventListener('click', () => {
                        const oldPlayerId = nameInput.dataset.playerId;
                        if (oldPlayerId) {
                            selectedPlayers.delete(oldPlayerId);
                        }
                        nameInput.value = player.name;
                        nameInput.dataset.playerId = player.id;
                        selectedPlayers.add(player.id);
                        dropdown.style.display = 'none';
                        updateAllDropdowns();
                    });
                }
                dropdown.appendChild(option);
            });
        }

        refreshDropdownOptions();

        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                refreshDropdownOptions();  // Refresh options when opening
            }
        });

        document.addEventListener('click', () => {
            dropdown.style.display = 'none';
        });

        comboWrapper.appendChild(nameInput);
        comboWrapper.appendChild(toggleButton);
        comboWrapper.appendChild(dropdown);
        playerHeader.appendChild(comboWrapper);

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
        playerHeader.appendChild(removeButton);
    }

    playerHeader.setAttribute('data-main-player', mainPlayer.toString());
    playerRow.appendChild(playerHeader);
}

function updateAllDropdowns() {
    document.querySelectorAll('.combo-wrapper').forEach(wrapper => {
        const dropdown = wrapper.querySelector('.combo-dropdown');
        const nameInput = wrapper.querySelector('.player-name-input');

        dropdown.querySelectorAll('.combo-option').forEach(option => {
            const playerId = option.getAttribute('data-id');
            if (selectedPlayers.has(playerId) && nameInput.dataset.playerId !== playerId) {
                option.classList.add('disabled-option');
                option.style.pointerEvents = 'none';
            } else {
                option.classList.remove('disabled-option');
                option.style.pointerEvents = 'auto';
            }
        });
    });
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
