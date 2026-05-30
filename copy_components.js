const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  fs.rmSync('c:\\SITEFORGE\\apps\\web\\components\\landing', { recursive: true, force: true });
} catch(e) {}
copyDir('c:\\SITEFORGE\\frontend\\src\\components\\landing', 'c:\\SITEFORGE\\apps\\web\\components\\landing');

try {
  fs.rmSync('c:\\SITEFORGE\\apps\\web\\components\\ui', { recursive: true, force: true });
} catch(e) {}
copyDir('c:\\SITEFORGE\\frontend\\src\\components\\ui', 'c:\\SITEFORGE\\apps\\web\\components\\ui');

// Also overwrite page.tsx
const pageContent = fs.readFileSync('c:\\SITEFORGE\\frontend\\src\\app\\page.jsx', 'utf8');
fs.writeFileSync('c:\\SITEFORGE\\apps\\web\\app\\page.tsx', pageContent);

console.log("Copied successfully!");
