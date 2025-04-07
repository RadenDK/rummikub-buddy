import {clearGameStateFromLocalStorage, getGameStateFromDOM} from './gameState.js';

export function initializeModalWindow() {
    // Get modal and buttons
    const finishGameBtn = document.getElementById('finish-game-btn');
    const finishGameModal = document.getElementById('finish-game-modal');
    const saveGameBtn = document.getElementById('save-game-btn');
    const abortGameBtn = document.getElementById('abort-game-btn');

    // Show the modal when Finish Game is clicked
    finishGameBtn.addEventListener('click', () => {
        finishGameModal.style.display = 'flex';
    });

    // Save game action
    saveGameBtn.addEventListener('click', () => {
        const gameState = getGameStateFromDOM();

        // Get the CSRF token from the meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch('/save-game-state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({gameState})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Game save Success:', data);
                clearGameStateFromLocalStorage();
                finishGameModal.style.display = 'none';
                location.reload();
            })
            .catch((error) => {
                console.error('Game save Error:', error);
                console.error('Error details:', error.message);
                clearGameStateFromLocalStorage();
                finishGameModal.style.display = 'none';
                location.reload();
            });
    });

    // Abort game action
    abortGameBtn.addEventListener('click', () => {
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
