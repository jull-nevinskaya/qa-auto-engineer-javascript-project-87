const fs = require('fs');
const path = require('path');

const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filePath);

  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yaml':
    case '.yml':
      return yaml.load(fileContent);
    case '.ini':
      return ini.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

module.exports = parseFile;
