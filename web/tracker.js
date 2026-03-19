
const fs = require('fs');
const contents = fs.readFileSync('d:\\DEV\\capta-sites\\web\\src\\app\\(admin)\\admin\\leads\\page.tsx', 'utf-8');
const lines = contents.split('\n');
let count = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const opens = (line.split('<div').length - 1);
  const closes = (line.split('</div>').length - 1);
  count += (opens - closes);
  if (opens !== closes) {
     console.log(`L${i+1}: Balance ${count} (O ${opens}, C ${closes})`);
  }
}
