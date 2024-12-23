const formatPlain = require('./plain');
const formatJson = require('./json');

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

module.exports = formatOutput;
