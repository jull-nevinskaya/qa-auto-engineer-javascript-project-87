const fileDiff = (obj1, obj2) => {
  const allKeys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const result = {};

  allKeys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      result[key] = value1; // Общее значение
    } else if (!(key in obj2)) {
      result[`- ${key}`] = value1; // Удалённый ключ
    } else if (!(key in obj1)) {
      result[`+ ${key}`] = value2; // Добавленный ключ
    } else if (isObject(value1) && isObject(value2)) {
      // Рекурсивное сравнение вложенных объектов
      result[key] = fileDiff(value1, value2);
    } else {
      result[`- ${key}`] = value1; // Изменённое значение (старое)
      result[`+ ${key}`] = value2; // Изменённое значение (новое)
    }
  });

  return result;
};

// Проверка, является ли значение объектом
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

module.exports = fileDiff;

// let obj1 =  {
//   host: 'hexlet.io',
//   timeout: 50,
//   proxy: '123.234.53.22',
//   follow: false
// };
//
// let obj2 = { timeout: 20, verbose: true, host: 'hexlet.io' };
//
// console.log(fileDiff(obj1, obj2));
