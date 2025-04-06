<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
<div class="login-container">
    <img src="images/rummikub-logo.png" alt="Rummikub Logo">
    <h1>Welcome to Rummikub Buddy</h1>
    <a href="/auth/google" class="login-btn">Login with Google</a>
    @if(isset($testResult))
        <div class="test-result">
            <h2>API Test Result:</h2>
            <pre>{{ json_encode($testResult, JSON_PRETTY_PRINT) }}</pre>
        </div>
    @endif
</div>
</body>
</html>
