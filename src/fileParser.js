const fs = require('fs');
const path = require('path');

const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filePath);

  if (extension === '.json') {
    return JSON.parse(fileContent);
  }

  throw new Error(`Unsupported file format: ${extension}`);
};

module.exports = parseFile;
