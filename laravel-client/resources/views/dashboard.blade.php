<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Rummikub Manager</title>
    <!-- Link to CSS -->
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
</head>

<body>
    <div class="dashboard-container">
        <!-- Profile Icon -->
        <div class="profile-icon">
            <img src="/images/profile-icon.png" alt="Profile Icon" class="icon">
        </div>

        <!-- Players Table -->
        <div class="players-container">
            <!-- Row containing the button and table -->
            <div class="header-row">
                <!-- Add Player Button -->
                <button id="add-player-btn" class="add-btn">+</button>
            </div>
            <table id="score-table">
                <thead>
                    <tr id="player-row">
                        <th>#</th>
                        <!-- Dynamic players will be added here -->
                    </tr>
                </thead>
                <tbody id="rounds-body">
                    <!-- Dynamic rounds will be added here -->
                </tbody>
                <tfoot>
                    <tr id="totals-row">
                        <th>Total</th>
                        <!-- Dynamic total scores will be added here -->
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Add Round Button -->
        <button id="add-round-btn" class="add-btn">Add Round</button>

        <!-- Finish Button -->
        <div class="finish-game-container">
            <button id="finish-game-btn" class="finish-btn">Finish Game</button>
        </div>
    </div>

    <!-- Modal Window -->
    <div id="finish-game-modal" class="modal">
        <div class="modal-content">
            <h2>Finish Game</h2>
            <p>Are you sure you want to finish this game?</p>
            <div class="modal-buttons">
                <button id="save-game-btn" class="modal-btn save-btn">Save Game</button>
                <button id="abort-game-btn" class="modal-btn abort-btn">Abort Game</button>
            </div>
        </div>
    </div>

    <!-- Link to JS -->
    <script type="module" src="{{ asset('js/main.js') }}"></script>
</body>

</html>
