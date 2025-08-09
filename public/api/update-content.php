
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'config.php';

// Verify admin authentication
session_start();
$headers = getallheaders();
$token = null;

if (isset($headers['Authorization'])) {
    $token = str_replace('Bearer ', '', $headers['Authorization']);
}

if (!$token || !isset($_SESSION['admin_token']) || $_SESSION['admin_token'] !== $token) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

try {
    foreach ($input as $key => $value) {
        $stmt = $pdo->prepare("UPDATE content_settings SET content_value = ? WHERE content_key = ?");
        $stmt->execute([$value, $key]);
        
        // Insert if doesn't exist
        if ($stmt->rowCount() === 0) {
            $stmt = $pdo->prepare("INSERT INTO content_settings (content_key, content_value) VALUES (?, ?)");
            $stmt->execute([$key, $value]);
        }
    }
    
    echo json_encode(['success' => true, 'message' => 'Content updated successfully']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
