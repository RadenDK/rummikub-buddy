import {clearGameStateFromLocalStorage, getGameStateFromDOM} from './gameState.js';

export function initializeModalWindow() {
    // Get modal and buttons
    const finishGameBtn = document.getElementById('finish-game-btn');
    const finishGameModal = document.getElementById('finish-game-modal');
    const saveGameBtn = document.getElementById('save-game-btn');
    const abortGameBtn = document.getElementById('abort-game-btn');

    // Show the modal when Finish Game is clicked
    finishGameBtn.addEventListener('click', () => {
        finishGameModal.style.display = 'block';
    });

    // Save game action
    saveGameBtn.addEventListener('click', () => {
        const gameState = getGameStateFromDOM();

        fetch('/save-game-state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ gameState })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Game save Success:', data);
            })
            .catch((error) => {
                console.error('Game save Error:', error);
            });

        finishGameModal.style.display = 'none';
    });

    // Abort game action
    abortGameBtn.addEventListener('click', () => {
        console.log('Game aborted!');
        clearGameStateFromLocalStorage();
        finishGameModal.style.display = 'none';
        location.reload(); // Reload the DOM
    });

    // Optional: Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === finishGameModal) {
            finishGameModal.style.display = 'none';
        }
    });
}
