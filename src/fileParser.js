import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

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
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export default parseFile;
