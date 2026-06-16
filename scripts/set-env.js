const fs = require('fs');
const path = require('path');

const apiUrl = process.env.API_URL || 'http://localhost:3000/api';

const content = `export const environment = { apiUrl: '${apiUrl}' };\n`;

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'environments', 'environment.ts'),
  content,
);
