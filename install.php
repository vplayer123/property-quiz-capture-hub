
<?php
// Installation script for CodeCanyon buyers
?>
<!DOCTYPE html>
<html>
<head>
    <title>Property Quiz App - Installation</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .step { background: #f9f9f9; padding: 20px; margin-bottom: 20px; border-radius: 5px; }
        .button { background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
        .success { color: green; }
        .error { color: red; }
        pre { background: #f1f1f1; padding: 10px; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>Property Quiz App - Installation Guide</h1>
    
    <div class="step">
        <h2>Step 1: Database Setup</h2>
        <p>1. Create a MySQL database in your cPanel</p>
        <p>2. Update database credentials in <code>public/api/config.php</code></p>
        <pre>define('DB_HOST', 'your_host');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');</pre>
    </div>

    <div class="step">
        <h2>Step 2: Run Database Installation</h2>
        <p>Click the button below to create the required database tables:</p>
        <a href="public/api/install.php" class="button" target="_blank">Install Database</a>
    </div>

    <div class="step">
        <h2>Step 3: Configure Admin Access</h2>
        <p>Update admin credentials in <code>public/api/config.php</code>:</p>
        <pre>define('ADMIN_USER', 'your_admin_username');
define('ADMIN_PASS', 'your_admin_password');</pre>
    </div>

    <div class="step">
        <h2>Step 4: Upload Files</h2>
        <p>Upload all files to your hosting account's public_html directory (or subdirectory)</p>
    </div>

    <div class="step">
        <h2>Step 5: Access Your App</h2>
        <p><strong>Frontend:</strong> <a href="index.html">Visit your website</a></p>
        <p><strong>Admin Panel:</strong> <a href="public/admin/">Visit admin panel</a></p>
    </div>

    <div class="step">
        <h2>Support</h2>
        <p>For support, please contact us through CodeCanyon.</p>
    </div>
</body>
</html>
