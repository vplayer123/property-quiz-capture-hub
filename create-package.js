
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Creating CodeCanyon package...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Build the React app
console.log('📦 Building React application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ React build completed');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Create package directory structure
const packageDir = 'codecanyon-package';
if (fs.existsSync(packageDir)) {
  fs.rmSync(packageDir, { recursive: true });
}
fs.mkdirSync(packageDir);

console.log('📁 Creating package structure...');

// Copy built files
if (fs.existsSync('dist')) {
  copyDir('dist', path.join(packageDir, 'dist'));
}

// Copy public directory (contains PHP files)
if (fs.existsSync('public')) {
  copyDir('public', path.join(packageDir, 'public'));
}

// Copy root files
const rootFiles = ['install.php', 'README.md'];
rootFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(packageDir, file));
  }
});

// Create index.html that points to dist
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Quiz App</title>
    <script>
        // Redirect to the built app
        window.location.href = './dist/index.html';
    </script>
</head>
<body>
    <p>Redirecting to Property Quiz App...</p>
    <p>If not redirected automatically, <a href="./dist/index.html">click here</a></p>
</body>
</html>`;

fs.writeFileSync(path.join(packageDir, 'index.html'), indexHtml);

console.log('✅ Package created successfully!');
console.log(`📦 Package location: ${packageDir}/`);
console.log('');
console.log('📋 Next steps:');
console.log('1. Test the package by uploading to a web server');
console.log('2. Run the installation by visiting install.php');
console.log('3. Zip the codecanyon-package folder for distribution');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
