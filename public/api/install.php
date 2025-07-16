
<?php
require_once 'config.php';

// Create database tables
try {
    // Quiz submissions table
    $sql = "CREATE TABLE IF NOT EXISTS quiz_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        address VARCHAR(500) NOT NULL,
        property_type ENUM('rent', 'buy', 'sell') NOT NULL,
        budget VARCHAR(100) NOT NULL,
        bedrooms VARCHAR(10),
        bathrooms VARCHAR(10),
        property_size VARCHAR(100),
        timeline VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);

    // Content management table
    $sql = "CREATE TABLE IF NOT EXISTS content_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content_key VARCHAR(100) UNIQUE NOT NULL,
        content_value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);

    // Insert default content
    $default_content = [
        ['step1_title', 'Find Your Perfect Property'],
        ['step1_subtitle', 'Start by entering your desired location'],
        ['step2_title', 'What are you looking to do?'],
        ['step2_subtitle', 'Choose your property goal'],
        ['step3_title', 'Budget & Requirements'],
        ['step3_subtitle', 'Tell us about your preferences'],
        ['step4_title', 'Timeline'],
        ['step4_subtitle', 'When are you looking to move?'],
        ['step5_title', 'Contact Information'],
        ['step5_subtitle', 'Get personalized property recommendations']
    ];

    $stmt = $pdo->prepare("INSERT IGNORE INTO content_settings (content_key, content_value) VALUES (?, ?)");
    foreach ($default_content as $content) {
        $stmt->execute($content);
    }

    echo "Installation completed successfully!";
} catch(PDOException $e) {
    echo "Installation failed: " . $e->getMessage();
}
?>
