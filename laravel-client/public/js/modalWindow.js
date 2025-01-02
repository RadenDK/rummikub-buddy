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
        // Add logic to save the game here
        console.log('Game saved!');
        finishGameModal.style.display = 'none';
    });

    // Abort game action
    abortGameBtn.addEventListener('click', () => {
        console.log('Game aborted!');
        finishGameModal.style.display = 'none';
    });

    // Optional: Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === finishGameModal) {
            finishGameModal.style.display = 'none';
        }
    });
}
