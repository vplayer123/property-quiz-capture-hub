
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT content_key, content_value FROM content_settings");
    $content = [];
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $content[$row['content_key']] = $row['content_value'];
    }
    
    echo json_encode(['success' => true, 'content' => $content]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
