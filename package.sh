
#!/bin/bash

echo "🚀 Creating HTML Template Package for CodeCanyon..."

# Remove old package if exists
rm -rf html-template-package
rm -f html-template-package.zip

# Create package directory structure
mkdir -p html-template-package
mkdir -p html-template-package/documentation

echo "📦 Building the React application..."
# Build the React app
npm run build

echo "📁 Copying built files..."
# Copy the built application
cp -r dist/* html-template-package/ 2>/dev/null || true

echo "📁 Copying assets..."
# Copy source assets for customization
mkdir -p html-template-package/src-assets
cp -r src/assets/* html-template-package/src-assets/ 2>/dev/null || true

echo "📝 Creating comprehensive documentation..."

# Create main README
cat > html-template-package/documentation/README.md << 'EOF'
# Property Quiz HTML Template - CodeCanyon

## 🏠 Description
A modern, responsive property quiz landing page built with React and compiled to pure HTML/CSS/JS. Perfect for real estate websites, property management companies, and lead generation campaigns.

## ✨ Features
- ✅ Multi-step property quiz with smooth navigation
- ✅ Fully responsive design (mobile-first)
- ✅ Email submission via EmailJS (no backend required)
- ✅ Address autocomplete integration
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Different colors for Buy/Sell/Rent options
- ✅ Interactive property map display
- ✅ Easy customization options
- ✅ Fast loading and SEO optimized

## 🔧 Requirements
- Any web hosting service (shared hosting works fine)
- Modern web browser
- EmailJS account (free tier available)

## 🚀 Quick Setup

### Step 1: Upload Files
1. Extract the `html-template-package.zip` file
2. Upload ALL contents to your web server
3. Your quiz will be accessible immediately

### Step 2: Email Configuration
1. Sign up for a free EmailJS account at https://www.emailjs.com/
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template
4. Update the configuration in the files (see setup guide)

### Step 3: Test Your Quiz
1. Visit your website
2. Complete the quiz to test email delivery
3. Check your admin email for submissions

## 📋 File Structure
```
/
├── index.html              # Main quiz page
├── assets/                 # CSS, JS, and images
│   ├── css/
│   ├── js/
│   └── images/
├── src-assets/             # Original source images for customization
└── documentation/          # Setup and customization guides
```

## 🎨 Customization Options
- **Colors**: Easy CSS variable customization
- **Content**: Direct HTML text editing
- **Images**: Replace hero background and assets
- **Email Template**: Customize submission format
- **Styling**: Built with Tailwind CSS

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
- Complete property quiz functionality
- EmailJS integration for submissions
- Mobile-responsive design
- Different colored icons for property types
- Interactive map integration
EOF

# Create setup guide
cat > html-template-package/documentation/SETUP.md << 'EOF'
# 🚀 Setup Guide

## Quick Start (5 Minutes)
Get your Property Quiz running with email submissions.

### 1. Upload to Your Server
- Extract the package files
- Upload everything to your hosting directory
- Your quiz is now live!

### 2. Configure Email Submissions

#### EmailJS Setup (Free)
1. Go to https://www.emailjs.com/ and create a free account
2. Add an email service (Gmail, Outlook, etc.)
3. Create a new email template with these variables:
   - `{{to_email}}` - Admin email
   - `{{subject}}` - Email subject
   - `{{message}}` - Quiz results

#### Update Configuration
Edit the JavaScript file in `assets/js/` and find the EmailJS configuration:

```javascript
// Replace these with your EmailJS credentials
const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id',     // From EmailJS dashboard
  TEMPLATE_ID: 'your_template_id',   // From EmailJS dashboard  
  PUBLIC_KEY: 'your_public_key',     // From EmailJS dashboard
  ADMIN_EMAIL: 'admin@yourdomain.com' // Your email address
};
```

#### Email Template Example
Create this template in EmailJS:

**Subject:** New Property Quiz Submission - {{subject}}

**Body:**
```
New Property Quiz Submission

Contact Information:
{{message}}

Please follow up with this lead promptly.
```

### 3. Test Everything
1. Complete the quiz on your website
2. Check your email for the submission
3. If no email arrives, check EmailJS logs

## Hosting Recommendations
- **Shared Hosting**: Works perfectly (GoDaddy, Bluehost, etc.)
- **Cloud Hosting**: AWS, Google Cloud, DigitalOcean
- **CDN**: Cloudflare for faster loading
- **Free Options**: Netlify, Vercel (great for testing)

## SSL Certificate
For production use, ensure your hosting has SSL enabled for security.
EOF

# Create customization guide
cat > html-template-package/documentation/CUSTOMIZATION.md << 'EOF'
# 🎨 Customization Guide

## Quick Customizations

### Change Colors
Edit the CSS variables in `assets/css/main.css`:

```css
:root {
  --primary: 220 50% 50%;        /* Main brand color */
  --primary-foreground: 0 0% 98%;
  --secondary: 220 20% 90%;      
  --accent: 120 50% 50%;         
}
```

### Update Content
Edit text directly in `index.html`:

```html
<!-- Quiz title -->
<h1>Find Your Perfect Property Match</h1>

<!-- Subtitle -->
<p>Take our quick quiz to discover properties tailored to your needs</p>
```

### Replace Images
1. Replace `assets/images/hero-bg.jpg` with your image
2. Keep the same filename or update the CSS reference
3. Recommended size: 1920x1080px

### Admin Email
Update your email address in the JavaScript configuration:

```javascript
ADMIN_EMAIL: 'your-email@domain.com'
```

## Advanced Customizations

### Property Type Colors
The icons have different colors by default:
- **Rent**: Orange (#ea580c)
- **Buy**: Blue (#2563eb) 
- **Sell**: Green (#16a34a)

To change these, edit the CSS classes in `assets/css/main.css`:

```css
.rent-icon { color: #your-color; }
.buy-icon { color: #your-color; }
.sell-icon { color: #your-color; }
```

### Budget Ranges
Edit the budget options in the JavaScript file:

```javascript
const budgetOptions = {
  rent: [
    { value: 'under-1000', label: 'Under $1,000/month' },
    // Add your ranges here
  ],
  buy: [
    { value: 'under-100k', label: 'Under $100,000' },
    // Add your ranges here
  ]
};
```

### Add More Form Fields
1. Add HTML input in `index.html`
2. Update the JavaScript to capture the value
3. Include in the email template

### Styling Framework
This template uses Tailwind CSS. You can:
- Add custom CSS classes
- Modify existing utility classes
- Use the Tailwind CDN for additional utilities

### Google Analytics
Add tracking to `index.html`:

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
Add conversion tracking:

```html
<!-- Facebook Pixel -->
<script>
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
  // Track quiz completion
  fbq('track', 'Lead');
</script>
```

## Development Setup
If you want to modify the React source:

1. Install Node.js
2. Run `npm install`
3. Modify files in `src/`
4. Run `npm run build`
5. Upload the new `dist/` files

## Support
Need help with customizations? Contact through CodeCanyon for assistance.
EOF

echo "📋 Creating example email template..."
# Create email template example
cat > html-template-package/documentation/EMAIL-TEMPLATE.md << 'EOF'
# 📧 Email Template Setup

## EmailJS Template Configuration

### Template Variables
Your EmailJS template should include these variables:

- `{{to_email}}` - Recipient email
- `{{subject}}` - Email subject line  
- `{{message}}` - Formatted quiz results

### Recommended Template

**Subject Line:**
```
New Property Quiz Submission - {{subject}}
```

**Email Body:**
```
Hello,

You have received a new property quiz submission:

{{message}}

---
This email was sent from your Property Quiz form.
Please respond to the customer promptly.

Best regards,
Your Property Quiz System
```

### Alternative Template (HTML)
For a more styled email:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { background: #4f46e5; color: white; padding: 20px; }
        .content { padding: 20px; }
        .info { background: #f3f4f6; padding: 15px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h2>New Property Quiz Submission</h2>
    </div>
    <div class="content">
        <div class="info">
            {{message}}
        </div>
        <p>Please follow up with this lead promptly.</p>
    </div>
</body>
</html>
```

## Testing Your Template

1. Complete the quiz with test data
2. Check your email inbox
3. Verify all information is formatted correctly
4. Test from different devices

## Troubleshooting

**Not receiving emails?**
- Check EmailJS dashboard for errors
- Verify service configuration
- Check spam folder
- Ensure template variables match

**Formatting issues?**
- Test with simple text template first
- Add HTML formatting gradually
- Check for typos in variable names

## Tips
- Use a professional email address for admin email
- Set up email filters to organize submissions
- Consider auto-reply templates for customers
- Monitor EmailJS usage limits (free tier: 200 emails/month)
EOF

echo "🔧 Setting proper file permissions..."
# Set proper permissions
find html-template-package -type d -exec chmod 755 {} \;
find html-template-package -type f -exec chmod 644 {} \;

echo "📦 Creating ZIP package for CodeCanyon..."
# Create ZIP file
cd html-template-package
zip -r ../html-template-package.zip . -x "*.DS_Store" "*/.*"
cd ..

echo "🧹 Cleaning up..."
# Optional: Remove the directory after zipping (uncomment if desired)
# rm -rf html-template-package

echo ""
echo "✅ HTML Template Package created successfully!"
echo "📦 Package file: html-template-package.zip"
echo "📁 Package folder: html-template-package/"
echo ""
echo "📋 Package includes:"
echo "   - Complete HTML template (built from React)"
echo "   - EmailJS integration for form submissions"
echo "   - Responsive design with modern UI"
echo "   - Comprehensive documentation"
echo "   - Easy customization guides"
echo "   - Email template examples"
echo ""
echo "🚀 Ready to upload to CodeCanyon!"
echo ""
echo "⚙️ Next steps:"
echo "   1. Test the built template locally"
echo "   2. Set up EmailJS account and update configuration"
echo "   3. Customize colors and content as needed"
echo "   4. Upload to CodeCanyon"
EOF
