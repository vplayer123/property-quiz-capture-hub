
#!/bin/bash

echo "🚀 Creating Property Quiz HTML Template Package for CodeCanyon..."

# Remove old package if exists
rm -rf property-quiz-template
rm -f property-quiz-template.zip

# Create package directory structure
mkdir -p property-quiz-template
mkdir -p property-quiz-template/documentation

echo "📦 Building the React application..."
# Build the React app
npm run build

echo "📁 Copying built files..."
# Copy the built application
cp -r dist/* property-quiz-template/ 2>/dev/null || true

echo "📁 Copying assets..."
# Copy source assets for customization
mkdir -p property-quiz-template/src-assets
cp -r src/assets/* property-quiz-template/src-assets/ 2>/dev/null || true

echo "📝 Creating comprehensive documentation..."

# Create main README
cp README.md property-quiz-template/documentation/

# Create setup guide
cat > property-quiz-template/documentation/SETUP.md << 'EOF'
# 🚀 Property Quiz Setup Guide

## Quick Start (5 Minutes)

### 1. Upload to Your Server
- Extract all files from the package
- Upload everything to your hosting directory (e.g., public_html)
- Your quiz is now live at your domain!

### 2. Configure Email Submissions

#### EmailJS Setup (Free & Easy)
1. Go to https://www.emailjs.com/ and create a free account
2. Add an email service (Gmail, Outlook, Yahoo, etc.)
3. Create a new email template with these variables:
   - `{{to_email}}` - Admin email address
   - `{{subject}}` - Email subject line
   - `{{message}}` - Formatted quiz results

#### Update Email Configuration
Edit `assets/js/email-config.js` and replace with your EmailJS credentials:

```javascript
// Replace these with your EmailJS credentials
export const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id',     // From EmailJS dashboard
  TEMPLATE_ID: 'your_template_id',   // From EmailJS dashboard  
  PUBLIC_KEY: 'your_public_key',     // From EmailJS dashboard
  ADMIN_EMAIL: 'admin@yourdomain.com' // Your email address
};
```

#### Sample Email Template
Create this template in your EmailJS account:

**Subject:** New Property Quiz Submission - {{subject}}

**Body:**
```
New Property Quiz Submission

{{message}}

Please follow up with this lead promptly.

---
Sent from Property Quiz Landing Page
```

### 3. Test Everything
1. Complete the quiz on your website
2. Check your email for the submission
3. If no email arrives, check EmailJS dashboard for errors

## Hosting Recommendations

### Shared Hosting (Easiest)
- **GoDaddy, Bluehost, Hostinger**: Perfect for beginners
- **Upload files to public_html folder**
- **No server configuration needed**

### Cloud Hosting (Advanced)
- **Netlify, Vercel**: Great for developers (free tiers available)
- **AWS S3, Google Cloud**: Enterprise solutions
- **Cloudflare Pages**: Fast global delivery

### Domain & SSL
- Ensure your hosting includes SSL certificate
- Point your domain to the hosting directory
- Quiz will be accessible at yourdomain.com

## Troubleshooting

**Quiz not loading?**
- Check that index.html is in the root directory
- Verify all asset files are uploaded correctly
- Check browser console for any errors

**Not receiving emails?**
- Verify EmailJS configuration is correct
- Check your spam/junk folder
- Test with a different email address
- Check EmailJS dashboard for delivery logs

**Map not showing?**
- Maps use OpenStreetMap (free, no API key needed)
- Check internet connection
- Verify JavaScript is enabled in browser
EOF

# Create customization guide
cat > property-quiz-template/documentation/CUSTOMIZATION.md << 'EOF'
# 🎨 Customization Guide

## Quick Customizations

### Change Your Email Address
Edit `assets/js/email-config.js`:
```javascript
ADMIN_EMAIL: 'your-email@yourdomain.com'
```

### Update Quiz Content
Edit `index.html` directly to change:
- Headlines and descriptions
- Button text
- Property types and options
- Contact form labels

### Change Colors
The template uses CSS variables for easy theming. Edit the main CSS file:

```css
:root {
  --primary: 220 50% 50%;        /* Main brand color (blue) */
  --buy-color: 220 70% 50%;      /* Buy option (blue) */
  --sell-color: 120 60% 40%;     /* Sell option (green) */
  --rent-color: 25 90% 50%;      /* Rent option (orange) */
}
```

### Replace Hero Background
1. Replace `assets/images/hero-bg.jpg` with your image
2. Recommended size: 1920x1080px
3. Keep the same filename or update CSS reference

## Advanced Customizations

### Property Budget Ranges
Edit the JavaScript to modify budget options:

```javascript
// In the main app file, find budgetOptions
const budgetOptions = {
  rent: [
    { value: 'under-1000', label: 'Under $1,000/month' },
    { value: '1000-2000', label: '$1,000 - $2,000/month' },
    // Add your custom ranges
  ],
  buy: [
    { value: 'under-200k', label: 'Under $200,000' },
    // Add your custom ranges
  ]
};
```

### Add More Form Fields
1. Edit the contact form HTML in `index.html`
2. Update the email template to include new fields
3. Modify the JavaScript to capture additional data

### Styling Changes
The template is built with Tailwind CSS:
- Utility classes for spacing, colors, typography
- Responsive design built-in
- Easy to modify existing styles

### Google Analytics Integration
Add tracking code to `index.html`:

```html
<!-- Before closing </head> tag -->
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
<!-- Before closing </head> tag -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
  
  // Track quiz completion
  fbq('track', 'Lead');
</script>
```

## Content Localization

### Multi-Language Support
1. Duplicate `index.html` for each language (e.g., `index-es.html`)
2. Translate all text content
3. Update email templates for each language
4. Link between language versions

### Currency Changes
Update budget options and display text to match your local currency:
- Replace $ with your currency symbol
- Adjust budget ranges for local market
- Update number formatting if needed

## Performance Optimization

### Image Optimization
- Compress hero background image
- Use WebP format for better compression
- Add loading="lazy" for images below fold

### Caching
- Enable browser caching on your hosting
- Use CDN for faster global loading
- Minimize HTTP requests

## SEO Optimization

### Meta Tags
Update meta tags in `index.html`:
```html
<meta name="description" content="Find your perfect property with our interactive quiz">
<meta name="keywords" content="property, real estate, buy, sell, rent">
<meta property="og:title" content="Property Quiz - Find Your Perfect Home">
```

### Structured Data
Add JSON-LD structured data for better search visibility.

## Support
Need help with customizations? Contact through CodeCanyon for assistance.
EOF

echo "🔧 Setting proper file permissions..."
# Set proper permissions
find property-quiz-template -type d -exec chmod 755 {} \;
find property-quiz-template -type f -exec chmod 644 {} \;

echo "📦 Creating ZIP package for CodeCanyon..."
# Create ZIP file
cd property-quiz-template
zip -r ../property-quiz-template.zip . -x "*.DS_Store" "*/.*"
cd ..

echo "🧹 Cleaning up..."
# Optional: Remove the directory after zipping (uncomment if desired)
# rm -rf property-quiz-template

echo ""
echo "✅ Property Quiz HTML Template Package created successfully!"
echo "📦 Package file: property-quiz-template.zip"
echo "📁 Package folder: property-quiz-template/"
echo ""
echo "📋 Package includes:"
echo "   - Complete HTML template (built from React)"
echo "   - EmailJS integration for submissions"
echo "   - Responsive design with modern UI"
echo "   - Interactive property map"
echo "   - Color-coded property types"
echo "   - Comprehensive documentation"
echo "   - Easy customization guides"
echo ""
echo "🚀 Ready to upload to CodeCanyon!"
echo ""
echo "⚙️ Features:"
echo "   ✅ No backend required"
echo "   ✅ Easy email configuration"
echo "   ✅ Mobile-responsive design"
echo "   ✅ Fast loading performance"
echo "   ✅ SEO optimized"
echo "   ✅ Easy customization"
echo ""
echo "📧 Don't forget to:"
echo "   1. Set up EmailJS account"
echo "   2. Configure email settings"
echo "   3. Test quiz submission"
echo "   4. Customize colors and content"
EOF
