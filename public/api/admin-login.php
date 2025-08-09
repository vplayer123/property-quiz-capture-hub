
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username']) || !isset($input['password'])) {
    echo json_encode(['success' => false, 'message' => 'Username and password required']);
    exit;
}

if ($input['username'] === ADMIN_USER && $input['password'] === ADMIN_PASS) {
    $token = bin2hex(random_bytes(32));
    
    // Store token in session or database (simple session for now)
    session_start();
    $_SESSION['admin_token'] = $token;
    $_SESSION['admin_logged_in'] = true;
    
    echo json_encode([
        'success' => true,
        'token' => $token,
        'message' => 'Login successful'
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
?>
