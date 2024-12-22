const { test, expect } = require('@jest/globals');
const fileDiff = require('../src/fileDiff');

test('Проверка выходного значения сравнения', () => {
  const data1 = {
    "str": "hexlet.io",
    "str1": 50
  };

  const data2 = {
    "str": "hexlet.io"
  };

  const dataRes = {
    "str": "hexlet.io",
    "- str1": 50,
  }

  expect(fileDiff(data1, data2)).toEqual(dataRes);
})

test('Проверка с пустым файлом', () => {
  const data1 = {
    "str": "hexlet.io",
    "str1": 50
  };
  const data2 = {};
  const dataRes = {
    "- str": "hexlet.io",
    "- str1": 50,
  };

  expect(fileDiff(data1, data2)).toEqual(dataRes);
})
