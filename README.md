
# Property Quiz App - CodeCanyon

A modern, responsive property finder quiz application with admin dashboard.

## Features

- **Interactive Quiz Interface**: Multi-step property finder with address autocomplete
- **Admin Dashboard**: Manage content and export submissions
- **Responsive Design**: Works on all devices
- **Easy Installation**: Simple setup for shared hosting/cPanel
- **CSV Export**: Download all submissions
- **Dynamic Content**: Edit quiz text from admin panel

## For Developers - Creating Package

To create the CodeCanyon distribution package:

```bash
# Build and package the application
node create-package.js

# Or use the convenience scripts:
# Windows:
package.bat

# Unix/Linux/Mac:
chmod +x package.sh
./package.sh
```

This will create a `codecanyon-package` folder ready for distribution.

## Installation Instructions for Buyers

### Quick Installation (Shared Hosting/cPanel)

1. **Upload Files**
   - Extract the zip file
   - Upload all contents to your hosting's `public_html` directory

2. **Database Setup**
   - Create a MySQL database in cPanel
   - Open `public/api/config.php` and update database credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'your_database_name');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   ```

3. **Install Database Tables**
   - Visit `yourdomain.com/public/api/install.php`
   - This will create the required tables automatically

4. **Configure Admin Access**
   - Update admin credentials in `public/api/config.php`:
   ```php
   define('ADMIN_USER', 'admin');
   define('ADMIN_PASS', 'your_secure_password');
   ```

5. **Done!**
   - Frontend: `yourdomain.com`
   - Admin Panel: `yourdomain.com/public/admin/`

### File Structure

```
/
├── index.html                # Main application entry
├── install.php              # Installation guide
├── dist/                    # Built React application
├── public/
│   ├── api/
│   │   ├── config.php       # Database configuration
│   │   ├── install.php      # Database installer
│   │   ├── submit.php       # Handle form submissions
│   │   └── get-content.php  # Dynamic content API
│   └── admin/
│       └── index.php        # Admin dashboard
└── README.md
```

## Admin Features

- **Content Management**: Edit all quiz text and titles
- **Submissions Export**: Download all form submissions as CSV
- **Dashboard**: View submission statistics
- **Secure Login**: Password-protected admin area

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Requirements

- PHP 7.0 or higher
- MySQL 5.6 or higher
- Web server (Apache/Nginx)

## Customization

### Styling
- Edit CSS files in `dist/assets/` for custom styling
- All colors use CSS variables for easy theming

### Content
- Use the admin panel to edit quiz text
- Or directly modify the `content_settings` database table

### Functionality
- Built React app is in `dist/` directory
- PHP APIs are in `public/api/` directory

## Support

For technical support, please contact us through CodeCanyon.

## License

Regular License - For single end product
Extended License - For multiple end products or resale

## Changelog

### Version 1.0.0
- Initial release
- Complete quiz functionality
- Admin dashboard
- CSV export feature
- Dynamic content management
