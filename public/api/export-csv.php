
<?php
require_once 'config.php';

// Verify admin authentication
session_start();
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    http_response_code(403);
    echo 'Unauthorized';
    exit;
}

try {
    $stmt = $pdo->query("SELECT * FROM quiz_submissions ORDER BY created_at DESC");
    $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="quiz_submissions_' . date('Y-m-d') . '.csv"');
    
    $output = fopen('php://output', 'w');
    
    if (!empty($submissions)) {
        // Write headers
        fputcsv($output, [
            'ID', 'Date', 'Address', 'Property Type', 'Budget', 'Bedrooms', 
            'Bathrooms', 'Property Size', 'Amenities', 'Timeline', 
            'Contact Name', 'Contact Email', 'Contact Phone'
        ]);
        
        // Write data
        foreach ($submissions as $submission) {
            fputcsv($output, [
                $submission['id'],
                $submission['created_at'],
                $submission['address'],
                $submission['property_type'],
                $submission['budget'],
                $submission['bedrooms'],
                $submission['bathrooms'],
                $submission['property_size'],
                $submission['amenities'],
                $submission['timeline'],
                $submission['contact_name'],
                $submission['contact_email'],
                $submission['contact_phone']
            ]);
        }
    }
    
    fclose($output);
} catch(PDOException $e) {
    http_response_code(500);
    echo 'Database error: ' . $e->getMessage();
}
?>
