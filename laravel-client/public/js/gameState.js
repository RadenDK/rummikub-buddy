/**
 * Game state management for localStorage persistence
 */

// Load game state from localStorage
export function loadGameStateFromLocalStorage() {
    const savedState = localStorage.getItem('rummikubGameState');
    return savedState ? JSON.parse(savedState) : null;
}

// Save game state to localStorage
export function saveGameStateToLocalStorage(gameState) {
    localStorage.setItem('rummikubGameState', JSON.stringify(gameState));
}

// Clear game state from localStorage
export function clearGameStateFromLocalStorage() {
    localStorage.removeItem('rummikubGameState');
}

// Create initial game state
export function createInitialGameState(players = []) {
    return {
        players: players,
        rounds: [],
        currentRound: 0
    };
}

// Collect current game state from the DOM
export function getCurrentGameState() {
    const players = [];
    const rounds = [];
    
    // Get players from the player row
    const playerHeaders = document.querySelectorAll('#player-row th');
    for (let i = 1; i < playerHeaders.length; i++) { // Skip the first header (#)
        const header = playerHeaders[i];
        const nameInput = header.querySelector('.player-name-input');
        const isMainPlayer = header.getAttribute('data-main-player') === 'true';
        
        players.push({
            name: nameInput ? nameInput.value : `Player ${i}`,
            isMain: isMainPlayer
        });
    }
    
    // Get rounds from the rounds body
    const roundRows = document.querySelectorAll('#rounds-body tr');
    roundRows.forEach(row => {
        const cells = Array.from(row.cells).slice(1); // Skip the round number cell
        const roundScores = cells.map(cell => {
            const value = parseInt(cell.textContent.trim(), 10);
            return isNaN(value) ? 0 : value;
        });
        rounds.push(roundScores);
    });
    
    return {
        players: players,
        rounds: rounds,
        currentRound: rounds.length
    };
}

// Save current game state to localStorage
export function saveCurrentGameState() {
    const currentState = getCurrentGameState();
    saveGameStateToLocalStorage(currentState);
}