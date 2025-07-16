
<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'property_quiz');
define('DB_USER', 'root');
define('DB_PASS', '');

// Admin credentials (change these)
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'admin123');

// Site configuration
define('SITE_NAME', 'Property Quiz App');
define('SITE_URL', 'http://localhost');

// Database connection
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
