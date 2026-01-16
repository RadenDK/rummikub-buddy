<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Rummikub Manager</title>
    <!-- Link to CSS -->
    <link rel="stylesheet" href="css/dashboard.css">
</head>

<body>
<h1>TESTING</h1>
<div class="dashboard-container">
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
                <th id="static-header">#</th>
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

    <!-- New Game Button -->
    <button id="new-game-btn" class="add-btn">New Game</button>
</div>

<!-- Link to JS -->
<script type="module" src="js/main.js"></script>
</body>
</html>
