const formatPlain = (diff, parent = '') => {
  const lines = Object.entries(diff).flatMap(([key, value]) => {
    const cleanKey = key.replace(/^(\+ |\- )/, '');// Убираем префиксы + или -
    const property = parent ? `${parent}.${cleanKey}` : cleanKey;

    if (typeof value === 'object' && !Array.isArray(value) && value !== null && !(key.startsWith('+') || key.startsWith('-'))) {
      return formatPlain(value, property);
    }

    // Обработка обновлённых значений (ключ одновременно присутствует с префиксами - и +)
    if (key.startsWith('- ') && `+ ${cleanKey}` in diff) {
      const newKey = `+ ${cleanKey}`;
      return `Property '${property}' was updated. From ${JSON.stringify(value)} to ${JSON.stringify(diff[newKey])}`;
    }

    // Обработка удалённых значений
    if (key.startsWith('- ')) {
      return `Property '${property}' was removed`;
    }

    // Обработка добавленных значений
    if (key.startsWith('+ ') && !(`- ${cleanKey}` in diff)) {
      return `Property '${property}' was added with value: ${JSON.stringify(value)}`;
    }

    return [];
  });

  return lines.join('\n');
};

module.exports = formatPlain;
