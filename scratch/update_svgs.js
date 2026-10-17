const fs = require('fs');
const b64 = fs.readFileSync('public/assets/vanae-logo.jpg').toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 430" width="492" height="430">
  <rect width="492" height="430" fill="#0D5A46"/>
  <image href="data:image/jpeg;base64,${b64}" width="492" height="430" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
fs.writeFileSync('public/assets/logo.svg', svg);
fs.writeFileSync('public/assets/logo-dark.svg', svg);
console.log('Successfully updated logo.svg and logo-dark.svg');
