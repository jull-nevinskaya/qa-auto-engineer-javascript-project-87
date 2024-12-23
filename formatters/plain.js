const formatPlain = (diff, parent = '') => {
  const lines = Object.entries(diff).flatMap(([key, value]) => {
    const cleanKey = key.replace(/^(\+ |- )/, ''); // Убираем префиксы + и -
    const property = parent ? `${parent}.${cleanKey}` : cleanKey;

    // Обработка вложенных объектов
    if (typeof value === 'object' && !Array.isArray(value) && value !== null && !(key.startsWith('+') || key.startsWith('-'))) {
      return formatPlain(value, property);
    }

    // Если ключ изменён: одновременно есть '- key' и '+ key'
    if (key.startsWith('- ') && `+ ${cleanKey}` in diff) {
      const newKey = `+ ${cleanKey}`;
      return `Property '${property}' was updated. From ${JSON.stringify(value)} to ${JSON.stringify(diff[newKey])}`;
    }

    // Если ключ удалён
    if (key.startsWith('- ') && !(`+ ${cleanKey}` in diff)) {
      return `Property '${property}' was removed`;
    }

    // Если ключ добавлен
    if (key.startsWith('+ ') && !(`- ${cleanKey}` in diff)) {
      return `Property '${property}' was added with value: ${JSON.stringify(value)}`;
    }

    return [];
  });

  return lines.join('\n');
};

module.exports = formatPlain;
