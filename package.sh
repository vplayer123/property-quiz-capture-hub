
#!/bin/bash

echo "🚀 Creating CodeCanyon package..."

# Remove old package if exists
rm -rf codecanyon-package
rm -f codecanyon-package.zip

# Create package directory structure
mkdir -p codecanyon-package
mkdir -p codecanyon-package/public/api
mkdir -p codecanyon-package/public/admin
mkdir -p codecanyon-package/src
mkdir -p codecanyon-package/documentation

echo "📁 Copying public files..."
# Copy public directory
cp -r public/* codecanyon-package/public/ 2>/dev/null || true

echo "📁 Copying source files..."
# Copy src directory
cp -r src/* codecanyon-package/src/ 2>/dev/null || true

echo "📁 Copying root files..."
# Copy root files
cp index.html codecanyon-package/ 2>/dev/null || true
cp package.json codecanyon-package/ 2>/dev/null || true
cp tailwind.config.ts codecanyon-package/ 2>/dev/null || true
cp vite.config.ts codecanyon-package/ 2>/dev/null || true
cp tsconfig*.json codecanyon-package/ 2>/dev/null || true
cp components.json codecanyon-package/ 2>/dev/null || true
cp postcss.config.js codecanyon-package/ 2>/dev/null || true

echo "📝 Creating documentation..."
# Create comprehensive documentation
cat > codecanyon-package/documentation/README.md << 'EOF'
# Property Quiz Capture Hub - CodeCanyon

## 🏠 Description
A modern, responsive property quiz application built with React, TypeScript, and Tailwind CSS. Perfect for real estate websites, property management companies, and lead generation campaigns.

## ✨ Features
- ✅ Multi-step property quiz with smooth navigation
- ✅ Responsive design for all devices (mobile-first)
- ✅ Admin dashboard with content management
- ✅ CSV export functionality for lead data
- ✅ MySQL database integration
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Address autocomplete integration ready
- ✅ Secure admin authentication
- ✅ Easy content editing without code changes

## 🔧 Requirements
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- Modern web browser
- cPanel or similar hosting control panel

## 🚀 Quick Installation

### Step 1: Upload Files
1. Extract the `codecanyon-package.zip` file
2. Upload ALL contents to your web server root directory or subdirectory
3. Ensure all folders maintain their structure

### Step 2: Database Setup
1. Create a new MySQL database in cPanel
2. Visit `yoursite.com/install.php` in your browser
3. Follow the installation wizard
4. Enter your database credentials when prompted

### Step 3: Admin Configuration
1. Set your admin username and password during installation
2. **Important**: Delete `install.php` after successful installation
3. Access admin panel at `yoursite.com/public/admin/`

## 📋 Default Structure
```
/
├── index.html              # Main application entry
├── install.php            # Installation wizard
├── src/                   # React source files
├── public/
│   ├── api/               # PHP backend files
│   │   ├── config.php     # Database configuration
│   │   ├── submit.php     # Form submission handler
│   │   └── admin-*.php    # Admin API endpoints
│   └── admin/
│       └── index.php      # Admin dashboard entry
└── documentation/         # Complete documentation
```

## 🎛️ Admin Features
- **Content Management**: Edit all quiz text and descriptions
- **Lead Management**: View all form submissions with filtering
- **CSV Export**: Download leads for CRM integration
- **Statistics Dashboard**: View submission analytics
- **Secure Access**: Password-protected admin area

## 🎨 Customization
- **Colors**: Edit CSS variables in `src/index.css`
- **Content**: Use admin panel to edit all quiz text
- **Layout**: Modify React components in `src/pages/`
- **Styling**: Built with Tailwind CSS for easy customization

## 🔒 Security Features
- SQL injection protection with prepared statements
- Admin session management
- XSS protection on all inputs
- Secure file permissions recommended

## 📱 Browser Support
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS/Android)

## 🆘 Support
For technical support and customization requests, please contact through CodeCanyon.

## 📄 License
- **Regular License**: Single end product use
- **Extended License**: Multiple end products or client work

## 📈 Changelog
### Version 1.0.0
- Initial CodeCanyon release
- Complete quiz functionality
- Admin dashboard with content management
- Mobile-responsive design
- CSV export feature
- Secure admin authentication
EOF

cat > codecanyon-package/documentation/INSTALLATION.md << 'EOF'
# 🚀 Installation Guide

## Quick Start (Recommended)
The fastest way to get your Property Quiz running on shared hosting.

### 1. Upload Files
- Extract `codecanyon-package.zip`
- Upload ALL files to your hosting directory (usually `public_html`)
- Maintain folder structure during upload

### 2. Run Installation Wizard
- Visit `yourdomain.com/install.php`
- Enter your database details
- Set admin credentials
- Click "Install"

### 3. Complete Setup
- Delete `install.php` file for security
- Visit your quiz at `yourdomain.com`
- Access admin at `yourdomain.com/public/admin/`

## Manual Installation

### Database Setup
If you prefer manual setup, create these tables:

```sql
CREATE DATABASE property_quiz;
USE property_quiz;

CREATE TABLE quiz_submissions (
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

CREATE TABLE content_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_key VARCHAR(100) UNIQUE NOT NULL,
    content_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO content_settings (content_key, content_value) VALUES
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

### Configure Database
Edit `public/api/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'your_secure_password');
```

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Verify database credentials in config.php
- Ensure MySQL service is running
- Check if database exists

**Blank Page/500 Error**
- Check PHP error logs in cPanel
- Verify PHP version is 7.4+
- Check file permissions (755 for directories, 644 for files)

**Admin Login Issues**
- Clear browser cache
- Check credentials in config.php
- Verify sessions are enabled in PHP

### File Permissions
```bash
# Set proper permissions
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 755 public/api/
```

### Server Requirements Check
- PHP 7.4+ with PDO, PDO_MySQL extensions
- MySQL 5.7+ or MariaDB equivalent
- Web server (Apache/Nginx)
- At least 50MB disk space
EOF

cat > codecanyon-package/documentation/CUSTOMIZATION.md << 'EOF'
# 🎨 Customization Guide

## Content Management
The easiest way to customize your quiz is through the admin dashboard.

### Editing Quiz Content
1. Login to admin panel: `yourdomain.com/public/admin/`
2. Go to "Content Management" tab
3. Edit titles and descriptions for each step
4. Click "Save Changes"

### Available Content Fields
- **Step 1**: Address search page
- **Step 2**: Property type selection
- **Step 3**: Budget and requirements
- **Step 4**: Timeline preferences
- **Step 5**: Contact information

## Visual Customization

### Colors and Branding
Edit `src/index.css` to change colors:
```css
:root {
  --primary: 220 50% 50%;        /* Main brand color */
  --secondary: 220 20% 90%;      /* Secondary color */
  --accent: 120 50% 50%;         /* Accent color */
  /* Customize these values */
}
```

### Layout Modifications
- Quiz step widths are responsive (60% on desktop, full on mobile)
- Containers use Tailwind CSS classes
- Easy to modify breakpoints and spacing

## Database Customization

### Adding New Form Fields
1. Update database schema:
```sql
ALTER TABLE quiz_submissions ADD COLUMN new_field VARCHAR(100);
```

2. Modify form components in `src/pages/`
3. Update `public/api/submit.php` to handle new field

### Custom Validation
Add validation in React components:
```javascript
const validateField = (value) => {
  if (!value) return "Field is required";
  // Add custom validation logic
  return null;
};
```

## Advanced Customization

### Email Notifications
Integrate PHPMailer in `submit.php`:
```php
// After saving to database
require_once 'phpmailer/PHPMailer.php';
$mail = new PHPMailer();
$mail->setFrom('noreply@yourdomain.com');
$mail->addAddress($email);
$mail->Subject = 'Property Quiz Submission';
$mail->Body = 'Thank you for your submission!';
$mail->send();
```

### CRM Integration
Send data to external CRM:
```php
// In submit.php after database save
$crmData = json_encode([
    'name' => $contactName,
    'email' => $contactEmail,
    'phone' => $contactPhone,
    'property_type' => $propertyType
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://your-crm.com/api/leads');
curl_setopt($ch, CURLOPT_POSTFIELDS, $crmData);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_exec($ch);
```

### Frontend Development
If you want to modify React components:
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

## Security Enhancements

### Admin Security
- Change default credentials immediately
- Use strong passwords
- Enable HTTPS in production
- Set session timeout

### File Security
- Remove `install.php` after setup
- Set proper file permissions
- Disable directory browsing
- Keep database credentials secure

## Performance Optimization

### Frontend
- Images are optimized and compressed
- CSS and JS are minified in production
- Lazy loading for better performance

### Backend
- Database queries use prepared statements
- Efficient indexing on search fields
- Connection pooling for high traffic

## Integration Examples

### Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Facebook Pixel
Add tracking for lead generation campaigns:
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## Support and Updates
For additional customization help, please contact through CodeCanyon messaging system.
EOF

echo "📦 Creating installation wizard..."
# Create installation wizard
cat > codecanyon-package/install.php << 'EOF'
<?php
session_start();

$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;
$errors = [];
$success = false;

// Database configuration defaults
$db_config = [
    'host' => 'localhost',
    'name' => '',
    'user' => '',
    'pass' => ''
];

$admin_config = [
    'user' => 'admin',
    'pass' => ''
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($step === 1) {
        // Validate database connection
        $db_config['host'] = trim($_POST['db_host'] ?? '');
        $db_config['name'] = trim($_POST['db_name'] ?? '');
        $db_config['user'] = trim($_POST['db_user'] ?? '');
        $db_config['pass'] = $_POST['db_pass'] ?? '';
        
        try {
            $pdo = new PDO("mysql:host={$db_config['host']}", $db_config['user'], $db_config['pass']);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Try to create database
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$db_config['name']}`");
            $pdo->exec("USE `{$db_config['name']}`");
            
            $_SESSION['db_config'] = $db_config;
            $step = 2;
        } catch (Exception $e) {
            $errors[] = "Database connection failed: " . $e->getMessage();
        }
    } else if ($step === 2) {
        // Install database and create config
        $db_config = $_SESSION['db_config'];
        $admin_config['user'] = trim($_POST['admin_user'] ?? '');
        $admin_config['pass'] = trim($_POST['admin_pass'] ?? '');
        
        if (empty($admin_config['user']) || empty($admin_config['pass'])) {
            $errors[] = "Admin username and password are required";
        } else {
            try {
                $pdo = new PDO("mysql:host={$db_config['host']};dbname={$db_config['name']}", $db_config['user'], $db_config['pass']);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
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
                
                // Create config file
                $config_content = "<?php
// Database configuration
define('DB_HOST', '{$db_config['host']}');
define('DB_NAME', '{$db_config['name']}');
define('DB_USER', '{$db_config['user']}');
define('DB_PASS', '{$db_config['pass']}');

// Admin credentials  
define('ADMIN_USER', '{$admin_config['user']}');
define('ADMIN_PASS', '{$admin_config['pass']}');

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
                
                if (!is_dir('public/api')) {
                    mkdir('public/api', 0755, true);
                }
                
                file_put_contents('public/api/config.php', $config_content);
                
                $success = true;
                session_destroy();
            } catch (Exception $e) {
                $errors[] = "Installation failed: " . $e->getMessage();
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Quiz - Installation Wizard</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 100%;
            overflow: hidden;
        }
        .header {
            background: #4f46e5;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 { font-size: 24px; margin-bottom: 10px; }
        .header p { opacity: 0.9; }
        .content { padding: 40px; }
        .step-indicator {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
        }
        .step {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 10px;
            font-weight: bold;
            position: relative;
        }
        .step.active { background: #4f46e5; color: white; }
        .step.completed { background: #10b981; color: white; }
        .step:not(:last-child):after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            width: 20px;
            height: 2px;
            background: #e5e7eb;
            transform: translateY(-50%);
        }
        .form-group { margin-bottom: 20px; }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #374151;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.2s;
        }
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #4f46e5;
        }
        .btn {
            background: #4f46e5;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: background 0.2s;
            width: 100%;
        }
        .btn:hover { background: #4338ca; }
        .error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .success {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            color: #166534;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        }
        .success h3 { margin-bottom: 15px; }
        .success ul { text-align: left; margin: 15px 0; }
        .success a { color: #4f46e5; text-decoration: none; font-weight: 600; }
        .success a:hover { text-decoration: underline; }
        .info-box {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #1e40af;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 Property Quiz Installation</h1>
            <p>Set up your property capture system in minutes</p>
        </div>
        
        <div class="content">
            <?php if ($success): ?>
                <div class="success">
                    <h3>🎉 Installation Complete!</h3>
                    <p>Your Property Quiz application has been successfully installed and configured.</p>
                    
                    <div style="margin: 20px 0; padding: 15px; background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px;">
                        <strong>⚠️ Important Security Step:</strong><br>
                        Please delete this <code>install.php</code> file immediately for security reasons.
                    </div>
                    
                    <div style="text-align: left; margin: 20px 0;">
                        <h4>📋 Your Admin Credentials:</h4>
                        <ul>
                            <li><strong>Username:</strong> <?php echo htmlspecialchars($admin_config['user']); ?></li>
                            <li><strong>Password:</strong> <?php echo htmlspecialchars($admin_config['pass']); ?></li>
                        </ul>
                    </div>
                    
                    <div style="text-align: left; margin: 20px 0;">
                        <h4>🚀 Next Steps:</h4>
                        <ul>
                            <li><a href="./">View your Property Quiz</a> - Test the front-end</li>
                            <li><a href="public/admin/">Access Admin Dashboard</a> - Manage content & leads</li>
                            <li>Customize content through the admin panel</li>
                            <li>Review the documentation for advanced features</li>
                        </ul>
                    </div>
                </div>
            <?php else: ?>
                <div class="step-indicator">
                    <div class="step <?php echo $step >= 1 ? 'active' : ''; ?>">1</div>
                    <div class="step <?php echo $step >= 2 ? 'active' : ''; ?>">2</div>
                </div>
                
                <?php if (!empty($errors)): ?>
                    <div class="error">
                        <?php foreach ($errors as $error): ?>
                            <p><?php echo htmlspecialchars($error); ?></p>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
                
                <?php if ($step === 1): ?>
                    <h2 style="margin-bottom: 20px;">Database Configuration</h2>
                    <div class="info-box">
                        <strong>📋 You'll need:</strong> Database name, username, password from your hosting control panel (cPanel, Plesk, etc.)
                    </div>
                    
                    <form method="POST">
                        <input type="hidden" name="step" value="1">
                        
                        <div class="form-group">
                            <label>Database Host:</label>
                            <input type="text" name="db_host" value="<?php echo htmlspecialchars($db_config['host']); ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Database Name:</label>
                            <input type="text" name="db_name" value="<?php echo htmlspecialchars($db_config['name']); ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Database Username:</label>
                            <input type="text" name="db_user" value="<?php echo htmlspecialchars($db_config['user']); ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Database Password:</label>
                            <input type="password" name="db_pass" value="<?php echo htmlspecialchars($db_config['pass']); ?>">
                        </div>
                        
                        <button type="submit" class="btn">Test Connection & Continue</button>
                    </form>
                    
                <?php elseif ($step === 2): ?>
                    <h2 style="margin-bottom: 20px;">Admin Account Setup</h2>
                    <div class="info-box">
                        <strong>🔐 Create your admin account:</strong> This will be used to access the dashboard and manage your quiz content.
                    </div>
                    
                    <form method="POST">
                        <input type="hidden" name="step" value="2">
                        
                        <div class="form-group">
                            <label>Admin Username:</label>
                            <input type="text" name="admin_user" value="<?php echo htmlspecialchars($admin_config['user']); ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Admin Password:</label>
                            <input type="password" name="admin_pass" value="<?php echo htmlspecialchars($admin_config['pass']); ?>" required minlength="6">
                            <small style="color: #6b7280;">Minimum 6 characters</small>
                        </div>
                        
                        <button type="submit" class="btn">Complete Installation</button>
                    </form>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
EOF

echo "🔧 Setting proper file permissions..."
# Set proper permissions
find codecanyon-package -type d -exec chmod 755 {} \;
find codecanyon-package -type f -exec chmod 644 {} \;

echo "📦 Creating ZIP package for CodeCanyon..."
# Create ZIP file
cd codecanyon-package
zip -r ../codecanyon-package.zip . -x "*.DS_Store" "*/.*" 
cd ..

echo "🧹 Cleaning up temporary files..."
# Optional: Remove the directory after zipping (uncomment if desired)
# rm -rf codecanyon-package

echo ""
echo "✅ CodeCanyon package created successfully!"
echo "📦 Package file: codecanyon-package.zip"
echo "📁 Package folder: codecanyon-package/"
echo ""
echo "📋 Package includes:"
echo "   - Complete React application"
echo "   - PHP backend with admin panel"
echo "   - Installation wizard (install.php)"
echo "   - Comprehensive documentation"
echo "   - All source files for customization"
echo ""
echo "🚀 Ready to upload to CodeCanyon!"
