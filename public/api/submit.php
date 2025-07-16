
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO quiz_submissions (address, property_type, budget, bedrooms, bathrooms, property_size, timeline, name, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $input['address'],
            $input['propertyType'],
            $input['budget'],
            $input['bedrooms'],
            $input['bathrooms'],
            $input['propertySize'],
            $input['timeline'],
            $input['contact']['name'],
            $input['contact']['email'],
            $input['contact']['phone']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Submission saved successfully']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
