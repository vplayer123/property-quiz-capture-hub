
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization');

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

try {
    $stmt = $pdo->query("SELECT * FROM quiz_submissions ORDER BY created_at DESC LIMIT 100");
    $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Format submissions for better display
    $formatted_submissions = [];
    foreach ($submissions as $submission) {
        $formatted_submissions[] = [
            'id' => $submission['id'],
            'address' => $submission['address'],
            'propertyType' => $submission['property_type'],
            'budget' => $submission['budget'],
            'bedrooms' => $submission['bedrooms'],
            'bathrooms' => $submission['bathrooms'],
            'propertySize' => $submission['property_size'],
            'amenities' => $submission['amenities'],
            'timeline' => $submission['timeline'],
            'contactName' => $submission['contact_name'],
            'contactEmail' => $submission['contact_email'],
            'contactPhone' => $submission['contact_phone'],
            'createdAt' => $submission['created_at']
        ];
    }
    
    echo json_encode(['success' => true, 'submissions' => $formatted_submissions]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
