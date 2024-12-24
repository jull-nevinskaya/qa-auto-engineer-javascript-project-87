import { test, expect } from '@jest/globals';
import fileDiff from '../src/fileDiff.js';

test('Сравнение плоских JSON файлов с одинаковыми ключами и значениями', () => {
  const data1 = { key1: 'value1', key2: 'value2', key3: 'value3' };
  const data2 = { key1: 'value1', key2: 'value2', key3: 'value3' };
  const expected = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  };
  expect(fileDiff(data1, data2)).toEqual(expected);
});

test('Сравнение плоских JSON файлов с различиями в значениях', () => {
  const data1 = { key1: 'value1', key2: 'value2', key3: 'value3' };
  const data2 = { key1: 'value1', key2: 'changedValue2', key3: 'value3' };
  const expected = {
    key1: 'value1',
    '- key2': 'value2',
    '+ key2': 'changedValue2',
    key3: 'value3',
  };
  expect(fileDiff(data1, data2)).toEqual(expected);
});

test('Сравнение плоских JSON файлов с отсутствующими ключами в первом файле', () => {
  const data1 = { key1: 'value1' };
  const data2 = { key1: 'value1', key2: 'value2' };
  const expected = {
    key1: 'value1',
    '+ key2': 'value2',
  };
  expect(fileDiff(data1, data2)).toEqual(expected);
});

test('Сравнение плоских JSON файлов с отсутствующими ключами во втором файле', () => {
  const data1 = { key1: 'value1', key2: 'value2' };
  const data2 = { key1: 'value1' };
  const expected = {
    key1: 'value1',
    '- key2': 'value2',
  };
  expect(fileDiff(data1, data2)).toEqual(expected);
});

test('Сравнение плоских JSON файлов с отсутствующими и добавленными ключами', () => {
  const data1 = { key1: 'value1', key2: 'value2' };
  const data2 = { key3: 'value3', key4: 'value4' };
  const expected = {
    '- key1': 'value1',
    '- key2': 'value2',
    '+ key3': 'value3',
    '+ key4': 'value4',
  };
  expect(fileDiff(data1, data2)).toEqual(expected);
});

test('Сравнение плоских JSON файлов с полностью пустыми файлами', () => {
  const data1 = {};
  const data2 = {};
  const expected = {};
  expect(fileDiff(data1, data2)).toEqual(expected);
});

test('Сравнение плоских JSON файлов: один файл пустой', () => {
  const data1 = { key1: 'value1', key2: 'value2' };
  const data2 = {};
  const expected = {
    '- key1': 'value1',
    '- key2': 'value2',
  };
  expect(fileDiff(data1, data2)).toEqual(expected);
});

test('Сравнение плоских JSON файлов с одинаковыми ключами, но разными значениями', () => {
  const data1 = { key1: 'value1', key2: 'value2', key3: 'value3' };
  const data2 = { key1: 'changedValue1', key2: 'changedValue2', key3: 'value3' };
  const expected = {
    '- key1': 'value1',
    '+ key1': 'changedValue1',
    '- key2': 'value2',
    '+ key2': 'changedValue2',
    key3: 'value3',
  };
  expect(fileDiff(data1, data2)).toEqual(expected);
});
