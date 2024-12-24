import formatPlain from './plain.js';
import formatJson from './json.js';

const formatters = {
  plain: formatPlain,
  json: formatJson,
};

const formatOutput = (diff, formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter(diff);
};

export default formatOutput;
