#!/bin/bash

echo "🚀 Creating CodeCanyon package..."

# Remove old package if exists
rm -rf codecanyon-package
rm -f codecanyon-package.zip

# Create package directory structure
mkdir -p codecanyon-package/public/api
mkdir -p codecanyon-package/public/admin
mkdir -p codecanyon-package/src/components/admin
mkdir -p codecanyon-package/src/pages
mkdir -p codecanyon-package/src/hooks
mkdir -p codecanyon-package/documentation

# Copy public files
cp -r public/* codecanyon-package/public/
cp index.html codecanyon-package/
cp *.json codecanyon-package/
cp *.js codecanyon-package/
cp *.ts codecanyon-package/

# Copy src files
cp -r src/* codecanyon-package/src/

# Create documentation
cat > codecanyon-package/documentation/README.md << 'EOF'
# Property Quiz Capture Hub

## Description
A modern, responsive property quiz application built with React, TypeScript, and Tailwind CSS. Perfect for real estate websites, property management companies, and lead generation.

## Features
- ✅ Multi-step property quiz with address search
- ✅ Responsive design for all devices
- ✅ Admin dashboard with content management
- ✅ CSV export functionality
- ✅ MySQL database integration
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Address autocomplete with OpenStreetMap
- ✅ Interactive maps integration
- ✅ PHP backend with secure admin area

## Requirements
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- Modern web browser

## Installation

### Step 1: Upload Files
1. Extract all files from the zip
2. Upload the contents to your web server root directory or subdirectory

### Step 2: Database Setup
1. Create a MySQL database
2. Run the SQL commands from `install.php` by visiting: `yoursite.com/install.php`
3. Update database credentials in `public/api/config.php`

### Step 3: Configuration
1. Edit `public/api/config.php` to configure:
   - Database connection details
   - Admin credentials (change default username/password)
   - Site settings

### Step 4: Build Frontend (Optional)
If you want to customize the frontend:
1. Install Node.js and npm
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the application
4. The built files will be in the `dist` folder

## Admin Access
- Default admin URL: `yoursite.com/admin/login`
- Default username: `admin`
- Default password: `admin123`
- **IMPORTANT: Change these credentials in `config.php`**

## Customization

### Content Management
- Access the admin dashboard to edit quiz step titles and descriptions
- All content is stored in the database and can be easily modified

### Styling
- Built with Tailwind CSS for easy customization
- Modify colors, fonts, and layouts in `src/index.css`
- Update theme colors in `tailwind.config.ts`

### Database Schema
The application uses these main tables:
- `quiz_submissions` - Stores form submissions
- `content_settings` - Stores editable content

## API Endpoints
- `GET /api/get-content.php` - Fetch quiz content
- `POST /api/submit.php` - Submit quiz form
- `POST /api/admin-login.php` - Admin authentication
- `GET /api/get-submissions.php` - Get submissions (admin only)
- `POST /api/update-content.php` - Update content (admin only)
- `GET /api/export-csv.php` - Export CSV (admin only)

## Support
For support and customization requests, please contact the developer.

## License
This script is licensed for use by the purchaser only. Distribution or resale is prohibited.

## Changelog
### Version 1.0
- Initial release with full quiz functionality
- Admin dashboard with content management
- Responsive design and modern UI
- CSV export functionality
EOF

cat > codecanyon-package/documentation/INSTALLATION.md << 'EOF'
# Installation Guide

## Quick Installation (Recommended)

1. **Extract files**: Unzip the package to your web server directory
2. **Run installer**: Visit `yoursite.com/install.php` in your browser
3. **Configure**: Follow the setup wizard to configure database and admin settings
4. **Complete**: Delete `install.php` after successful installation

## Manual Installation

### 1. Database Setup
Create a new MySQL database and run this SQL:

```sql
CREATE DATABASE property_quiz;
USE property_quiz;

CREATE TABLE IF NOT EXISTS quiz_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address TEXT NOT NULL,
    property_type VARCHAR(10) NOT NULL,
    budget VARCHAR(50),
    bedrooms VARCHAR(10),
    bathrooms VARCHAR(10),
    property_size VARCHAR(50),
    amenities TEXT,
    timeline VARCHAR(50),
    contact_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_key VARCHAR(100) UNIQUE NOT NULL,
    content_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO content_settings (content_key, content_value) VALUES
('step1_title', 'Find Your Perfect Property'),
('step1_subtitle', 'Start by entering your desired location'),
('step2_title', 'What are you looking to do?'),
('step2_subtitle', 'Choose your property goal'),
('step3_title', 'Budget & Requirements'),
('step3_subtitle', 'Tell us about your preferences'),
('step4_title', 'Timeline'),
('step4_subtitle', 'When are you looking to move?'),
('step5_title', 'Contact Information'),
('step5_subtitle', 'Get personalized property recommendations');
```

### 2. Configure Database Connection
Edit `public/api/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

// Change admin credentials
define('ADMIN_USER', 'your_admin_username');
define('ADMIN_PASS', 'your_secure_password');
```

### 3. Set File Permissions
```bash
chmod 755 public/api/
chmod 644 public/api/*.php
chmod 644 index.html
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check database credentials in `config.php`
   - Ensure MySQL service is running
   - Verify database exists

2. **Blank Page/500 Error**
   - Check PHP error logs
   - Ensure PHP version is 7.4+
   - Verify file permissions

3. **Admin Login Issues**
   - Check credentials in `config.php`
   - Clear browser cache
   - Verify session support in PHP

### File Permissions
- Directories: 755
- PHP files: 644
- HTML files: 644

### Server Requirements
- PHP 7.4+
- MySQL 5.7+
- mod_rewrite (optional)
- PHP extensions: PDO, PDO_MySQL, JSON, Session
EOF

cat > codecanyon-package/documentation/CUSTOMIZATION.md << 'EOF'
# Customization Guide

## Content Management
All quiz content can be edited through the admin dashboard at `/admin/login`.

### Default Content Structure
- `step1_title` & `step1_subtitle` - Address search page
- `step2_title` & `step2_subtitle` - Property type selection
- `step3_title` & `step3_subtitle` - Budget and requirements
- `step4_title` & `step4_subtitle` - Timeline selection
- `step5_title` & `step5_subtitle` - Contact information

## Styling Customization

### Colors and Themes
Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 220 50% 50%;
  --secondary: 220 20% 90%;
  /* Add your custom colors */
}
```

### Layout Modifications
- Main container widths are defined in each page component
- Responsive breakpoints use Tailwind CSS classes
- Card layouts can be modified in individual page files

## Database Customization

### Adding New Fields
1. Update the database schema
2. Modify the form components in `src/pages/`
3. Update the submission API in `public/api/submit.php`

### Custom Validation
Add validation rules in each page component's submit handlers.

## API Customization

### Adding New Endpoints
Create new PHP files in `public/api/` following the existing pattern:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

// Your custom logic here
?>
```

### Email Notifications
Add email functionality by integrating PHPMailer or similar in `submit.php`.

## Frontend Development

### Building from Source
```bash
npm install
npm run dev    # Development server
npm run build  # Production build
```

### Component Structure
- `src/pages/` - Individual quiz steps
- `src/components/` - Reusable components
- `src/hooks/` - Custom React hooks

## Security Considerations

### Admin Security
- Change default admin credentials
- Use HTTPS in production
- Implement session timeout
- Add CSRF protection for forms

### Database Security
- Use prepared statements (already implemented)
- Regularly backup data
- Limit database user privileges

## Performance Optimization

### Frontend
- Images are optimized and compressed
- Lazy loading for heavy components
- Efficient state management

### Backend
- Database queries are optimized
- Proper indexing on frequently queried fields
- Connection pooling for high traffic

## Integration Examples

### CRM Integration
Modify `public/api/submit.php` to send data to your CRM:

```php
// After saving to database
$crmData = [
    'name' => $data['contact']['name'],
    'email' => $data['contact']['email'],
    // ... other fields
];

// Send to CRM API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://your-crm.com/api/leads');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($crmData));
// ... other curl options
curl_exec($ch);
```

### Email Marketing
Integrate with services like Mailchimp or SendGrid for automatic follow-ups.

## Troubleshooting Custom Changes

### Common Issues
1. **Build Errors**: Check TypeScript types and imports
2. **API Errors**: Verify PHP syntax and database connections  
3. **Styling Issues**: Use browser dev tools to debug CSS

### Development Tips
- Use browser dev tools for debugging
- Check console for JavaScript errors
- Monitor network tab for API issues
- Test responsive design on multiple devices
EOF

# Copy package files
cp package.json codecanyon-package/
cp tailwind.config.ts codecanyon-package/
cp vite.config.ts codecanyon-package/
cp tsconfig*.json codecanyon-package/

# Create install script
cat > codecanyon-package/install.php << 'EOF'
<?php
// Database configuration (update these values)
$db_host = 'localhost';
$db_name = 'property_quiz';
$db_user = 'root';
$db_pass = '';

$admin_user = 'admin';
$admin_pass = 'admin123';

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db_host = $_POST['db_host'];
    $db_name = $_POST['db_name'];
    $db_user = $_POST['db_user'];
    $db_pass = $_POST['db_pass'];
    $admin_user = $_POST['admin_user'];
    $admin_pass = $_POST['admin_pass'];
    
    try {
        // Test database connection
        $pdo = new PDO("mysql:host=$db_host", $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Create database if it doesn't exist
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db_name`");
        $pdo->exec("USE `$db_name`");
        
        // Create tables
        $sql = "
        CREATE TABLE IF NOT EXISTS quiz_submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            address TEXT NOT NULL,
            property_type VARCHAR(10) NOT NULL,
            budget VARCHAR(50),
            bedrooms VARCHAR(10),
            bathrooms VARCHAR(10),
            property_size VARCHAR(50),
            amenities TEXT,
            timeline VARCHAR(50),
            contact_name VARCHAR(100) NOT NULL,
            contact_email VARCHAR(100) NOT NULL,
            contact_phone VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS content_settings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content_key VARCHAR(100) UNIQUE NOT NULL,
            content_value TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        INSERT IGNORE INTO content_settings (content_key, content_value) VALUES
        ('step1_title', 'Find Your Perfect Property'),
        ('step1_subtitle', 'Start by entering your desired location'),
        ('step2_title', 'What are you looking to do?'),
        ('step2_subtitle', 'Choose your property goal'),
        ('step3_title', 'Budget & Requirements'),
        ('step3_subtitle', 'Tell us about your preferences'),
        ('step4_title', 'Timeline'),
        ('step4_subtitle', 'When are you looking to move?'),
        ('step5_title', 'Contact Information'),
        ('step5_subtitle', 'Get personalized property recommendations');
        ";
        
        $pdo->exec($sql);
        
        // Update config file
        $config_content = "<?php
// Database configuration
define('DB_HOST', '$db_host');
define('DB_NAME', '$db_name');
define('DB_USER', '$db_user');
define('DB_PASS', '$db_pass');

// Admin credentials
define('ADMIN_USER', '$admin_user');
define('ADMIN_PASS', '$admin_pass');

// Site configuration
define('SITE_NAME', 'Property Quiz App');
define('SITE_URL', 'http://' . \$_SERVER['HTTP_HOST']);

// Database connection
try {
    \$pdo = new PDO(\"mysql:host=\" . DB_HOST . \";dbname=\" . DB_NAME, DB_USER, DB_PASS);
    \$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException \$e) {
    die(\"Connection failed: \" . \$e->getMessage());
}
?>";
        
        file_put_contents('public/api/config.php', $config_content);
        
        $success = true;
    } catch (Exception $e) {
        $errors[] = "Installation failed: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Property Quiz - Installation</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        button { background: #007cba; color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
        .error { color: red; background: #ffe6e6; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .success { color: green; background: #e6ffe6; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .card { background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>Property Quiz Installation</h1>
    
    <?php if ($success): ?>
        <div class="success">
            <h3>✅ Installation Successful!</h3>
            <p>Your Property Quiz application has been installed successfully.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li>Delete this install.php file for security</li>
                <li>Visit <a href="admin/login">Admin Dashboard</a> to manage content</li>
                <li>Test the quiz by visiting the <a href="./">homepage</a></li>
            </ul>
            <p><strong>Admin Credentials:</strong></p>
            <ul>
                <li>Username: <?php echo htmlspecialchars($admin_user); ?></li>
                <li>Password: <?php echo htmlspecialchars($admin_pass); ?></li>
            </ul>
        </div>
    <?php else: ?>
        
        <?php if (!empty($errors)): ?>
            <div class="error">
                <?php foreach ($errors as $error): ?>
                    <p><?php echo htmlspecialchars($error); ?></p>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        
        <div class="card">
            <h3>Database Configuration</h3>
            <form method="POST">
                <div class="form-group">
                    <label>Database Host:</label>
                    <input type="text" name="db_host" value="<?php echo htmlspecialchars($db_host); ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Database Name:</label>
                    <input type="text" name="db_name" value="<?php echo htmlspecialchars($db_name); ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Database Username:</label>
                    <input type="text" name="db_user" value="<?php echo htmlspecialchars($db_user); ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Database Password:</label>
                    <input type="password" name="db_pass" value="<?php echo htmlspecialchars($db_pass); ?>">
                </div>
                
                <h3>Admin Account</h3>
                
                <div class="form-group">
                    <label>Admin Username:</label>
                    <input type="text" name="admin_user" value="<?php echo htmlspecialchars($admin_user); ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Admin Password:</label>
                    <input type="password" name="admin_pass" value="<?php echo htmlspecialchars($admin_pass); ?>" required>
                </div>
                
                <button type="submit">Install Property Quiz</button>
            </form>
        </div>
    <?php endif; ?>
</body>
</html>
EOF

echo "Copying source files..."
find src -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.jpg" -o -name "*.png" -o -name "*.svg" | while read file; do
    cp "$file" "codecanyon-package/$file"
done

# Set proper permissions
echo "Setting file permissions..."
find codecanyon-package -type f -name "*.php" -exec chmod 644 {} \;
find codecanyon-package -type f -name "*.html" -exec chmod 644 {} \;
find codecanyon-package -type f -name "*.js" -exec chmod 644 {} \;
find codecanyon-package -type d -exec chmod 755 {} \;

# Create zip file for CodeCanyon
echo "Creating zip file..."
zip -r codecanyon-package.zip codecanyon-package/

echo "✅ CodeCanyon package created successfully!"
echo "📁 Package folder: codecanyon-package/"
echo "📦 Zip file: codecanyon-package.zip"
echo ""
echo "Package contents:"
ls -la codecanyon-package/
echo ""
echo "Ready to upload codecanyon-package.zip to CodeCanyon!"
