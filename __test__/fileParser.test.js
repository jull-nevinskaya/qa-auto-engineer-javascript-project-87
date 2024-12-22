const { test, expect } = require('@jest/globals');
const parseFile = require('../src/fileParser');
const path = require('path');

test('Парсинг реального JSON файла', () => {
  const filePath = path.join(__dirname, '../__fixtures__/file1.json');
  const result = parseFile(filePath);
  expect(result).toEqual({
    key1: 'value1',
    key2: 'value2',
  });
});

test('Парсинг YAML файла', () => {
  const filePath = path.join(__dirname, '../__fixtures__/file1.yaml');
  const result = parseFile(filePath);
  expect(result).toEqual({
    key1: 'value1',
    key2: 'value2',
  });
});

test('Ошибка при парсинге некорректного YAML файла', () => {
  const filePath = path.join(__dirname, '../__fixtures__/invalid.yaml');
  expect(() => parseFile(filePath)).toThrow();
});
