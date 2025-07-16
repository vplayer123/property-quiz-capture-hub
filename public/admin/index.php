
<?php
session_start();
require_once '../api/config.php';

// Simple authentication
if (!isset($_SESSION['admin_logged_in'])) {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        if ($_POST['username'] === ADMIN_USER && $_POST['password'] === ADMIN_PASS) {
            $_SESSION['admin_logged_in'] = true;
        } else {
            $error = "Invalid credentials";
        }
    }
    
    if (!isset($_SESSION['admin_logged_in'])) {
        ?>
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Login - <?php echo SITE_NAME; ?></title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 400px; margin: 100px auto; padding: 20px; }
                .form-group { margin-bottom: 15px; }
                label { display: block; margin-bottom: 5px; }
                input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
                button { background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
                .error { color: red; margin-bottom: 15px; }
            </style>
        </head>
        <body>
            <h2>Admin Login</h2>
            <?php if (isset($error)) echo "<div class='error'>$error</div>"; ?>
            <form method="POST">
                <div class="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" required>
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </body>
        </html>
        <?php
        exit;
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle content updates
if (isset($_POST['update_content'])) {
    foreach ($_POST as $key => $value) {
        if (strpos($key, 'content_') === 0) {
            $content_key = str_replace('content_', '', $key);
            $stmt = $pdo->prepare("UPDATE content_settings SET content_value = ? WHERE content_key = ?");
            $stmt->execute([$value, $content_key]);
        }
    }
    $success = "Content updated successfully!";
}

// Get current content
$stmt = $pdo->query("SELECT content_key, content_value FROM content_settings ORDER BY content_key");
$content = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $content[$row['content_key']] = $row['content_value'];
}

// Get submissions for CSV export
if (isset($_GET['export_csv'])) {
    $stmt = $pdo->query("SELECT * FROM quiz_submissions ORDER BY created_at DESC");
    $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="quiz_submissions.csv"');
    
    $output = fopen('php://output', 'w');
    if (!empty($submissions)) {
        fputcsv($output, array_keys($submissions[0]));
        foreach ($submissions as $submission) {
            fputcsv($output, $submission);
        }
    }
    fclose($output);
    exit;
}

// Get submissions count
$stmt = $pdo->query("SELECT COUNT(*) as total FROM quiz_submissions");
$total_submissions = $stmt->fetch()['total'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard - <?php echo SITE_NAME; ?></title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .header { background: white; padding: 20px; margin-bottom: 20px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; }
        .card { background: white; padding: 20px; margin-bottom: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
        button { background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px; }
        button:hover { background: #005a87; }
        .success { color: green; margin-bottom: 15px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .stat-card { background: #007cba; color: white; padding: 20px; border-radius: 5px; text-align: center; }
        .logout { background: #dc3545; }
    </style>
</head>
<body>
    <div class="header">
        <h1><?php echo SITE_NAME; ?> - Admin Dashboard</h1>
        <a href="?logout=1"><button class="logout">Logout</button></a>
    </div>

    <div class="stats">
        <div class="stat-card">
            <h3>Total Submissions</h3>
            <h2><?php echo $total_submissions; ?></h2>
        </div>
    </div>

    <div class="card">
        <h2>Export Data</h2>
        <a href="?export_csv=1"><button>Download CSV</button></a>
    </div>

    <div class="card">
        <h2>Content Management</h2>
        <?php if (isset($success)) echo "<div class='success'>$success</div>"; ?>
        
        <form method="POST">
            <?php foreach ($content as $key => $value): ?>
                <div class="form-group">
                    <label><?php echo ucwords(str_replace('_', ' ', $key)); ?>:</label>
                    <input type="text" name="content_<?php echo $key; ?>" value="<?php echo htmlspecialchars($value); ?>">
                </div>
            <?php endforeach; ?>
            
            <button type="submit" name="update_content">Update Content</button>
        </form>
    </div>
</body>
</html>
