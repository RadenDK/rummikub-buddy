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
            <table id="score-table">
                <thead>
                    <tr id="player-row">
                        <th>#</th>
                        <th>Player 1</th>
                        <th>Player 2</th>
                        <th>Player 3</th>
                        <th>Player 4</th>
                        <th class="add-player-cell">
                            <button id="add-player-btn" class="add-btn">+</button>
                        </th>
                    </tr>
                </thead>
                <tbody id="rounds-body">
                    <td contenteditable="true">1</td> <!-- Round 1 -->
                    <td contenteditable="true">0</td> <!-- Player 1 initial round 1 score -->
                    <td contenteditable="true">0</td> <!-- Player 2 initial round 1 score -->
                    <td contenteditable="true">0</td> <!-- Player 3 initial round 1 score -->
                    <td contenteditable="true">0</td> <!-- Player 4 initial round 1 score -->
                    <!-- Dynamic rounds will be added here -->
                </tbody>
                <tfoot>
                    <tr id="totals-row">
                        <th>Total</th>
                        <!-- Total values will dynamically be updated in js -->
                        <td>0</td> <!-- Player 1 initial total -->
                        <td>0</td> <!-- Player 2 initial total -->
                        <td>0</td> <!-- Player 3 initial total -->
                        <td>0</td> <!-- Player 4 initial total -->
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
    <!-- Link to JS -->
    <script src="{{ asset('js/dashboard.js') }}"></script>
</body>

</html>