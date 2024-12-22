const formatPlain = require('./plain');

const formatters = {
  plain: formatPlain,
};

const formatOutput = (diff, formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter(diff);
};

module.exports = formatOutput;
