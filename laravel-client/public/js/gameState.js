// Function to retrieve the current game state from the DOM
export function getGameStateFromDOM() {
    // Get players from the column headers
    const playerRow = document.getElementById('player-row');
    const players = Array
        .from(playerRow.querySelectorAll('th[data-main-player]'))
        .map(header => ({
            name: header.querySelector('.player-name-input')?.value.trim() || '',
            isMain: header.getAttribute('data-main-player') === 'true'
        }));


    // Get rounds and scores from the table body
    const roundsBody = document.getElementById('rounds-body');
    const rounds = Array.from(roundsBody.rows).map(row =>
        Array.from(row.cells).slice(1).map(cell => parseInt(cell.textContent.trim(), 10) || 0)
    );

    return { players, rounds };
}

// Function to save the game state to local storage
export function saveGameStateToLocalStorage() {
    const { players, rounds } = getGameStateFromDOM();
    const gameState = { players, rounds };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    console.log('Game state saved:', gameState); // Debugging log
}

// Function to retrieve the game state from local storage
export function loadGameStateFromLocalStorage() {
    const savedState = localStorage.getItem('gameState');
    if (!savedState) {
        console.log('No saved game state found.');
        return null;
    }

    const gameState = JSON.parse(savedState);
    console.log('Game state loaded:', gameState); // Debugging log
    return gameState;
}
