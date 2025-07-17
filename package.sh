
#!/bin/bash

echo "Creating CodeCanyon package..."

# Remove old package if exists
rm -rf codecanyon-package

# Create package directory structure
mkdir -p codecanyon-package/public/api
mkdir -p codecanyon-package/public/admin

# Build the React application
echo "Building React application..."
npm run build

# Copy built React app
echo "Copying built application..."
cp -r dist/* codecanyon-package/

# Copy PHP backend files
echo "Copying PHP backend files..."
cp public/api/*.php codecanyon-package/public/api/
cp public/admin/*.php codecanyon-package/public/admin/

# Copy installation and documentation files
echo "Copying documentation..."
cp install.php codecanyon-package/
cp README.md codecanyon-package/

# Copy robots.txt if it exists
if [ -f public/robots.txt ]; then
    cp public/robots.txt codecanyon-package/
fi

# Create htaccess for better compatibility
echo "Creating .htaccess file..."
cat > codecanyon-package/.htaccess << 'EOF'
# Enable rewrite engine
RewriteEngine On

# Handle React Router (SPA) routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/public/
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
EOF

# Create package info file
echo "Creating package info..."
cat > codecanyon-package/PACKAGE_INFO.txt << 'EOF'
Property Quiz App - CodeCanyon Package
=====================================

This package contains a complete property finder quiz application.

Installation:
1. Upload all files to your web hosting public_html directory
2. Create a MySQL database
3. Edit public/api/config.php with your database credentials
4. Visit yourdomain.com/public/api/install.php to install database tables
5. Update admin credentials in public/api/config.php

Structure:
- index.html - Main application entry point
- dist/ - Built React application assets
- public/api/ - PHP backend APIs
- public/admin/ - Admin dashboard
- install.php - Installation guide

Admin Panel: yourdomain.com/public/admin/
Default Admin: admin/admin (change in config.php)

Support: Available through CodeCanyon
EOF

# Set proper permissions
echo "Setting file permissions..."
find codecanyon-package -type f -name "*.php" -exec chmod 644 {} \;
find codecanyon-package -type f -name "*.html" -exec chmod 644 {} \;
find codecanyon-package -type f -name "*.css" -exec chmod 644 {} \;
find codecanyon-package -type f -name "*.js" -exec chmod 644 {} \;
find codecanyon-package -type d -exec chmod 755 {} \;

echo "✅ CodeCanyon package created successfully in 'codecanyon-package' directory"
echo "📁 Ready for upload to CodeCanyon!"
echo ""
echo "Package contents:"
ls -la codecanyon-package/
echo ""
echo "To test locally, upload the codecanyon-package contents to a web server."
