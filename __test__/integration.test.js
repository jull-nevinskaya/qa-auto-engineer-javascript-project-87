import { test, expect } from '@jest/globals';
import parseFile from '../src/fileParser.js';
import fileDiff from '../src/fileDiff.js';
import * as path from 'path';

test('Сравнение двух реальных JSON файлов', () => {
  const file1Path = path.join(__dirname, '../__fixtures__/file1.json');
  const file2Path = path.join(__dirname, '../__fixtures__/file2.json');

  const data1 = parseFile(file1Path);
  const data2 = parseFile(file2Path);

  const diff = fileDiff(data1, data2);

  expect(diff).toEqual({
    key1: 'value1',
    '- key2': 'value2',
    '+ key2': 'changedValue2',
  });
});

test('Сравнение двух YAML файлов', () => {
  const file1Path = path.join(__dirname, '../__fixtures__/file1.yaml');
  const file2Path = path.join(__dirname, '../__fixtures__/file2.yaml');

  const data1 = parseFile(file1Path);
  const data2 = parseFile(file2Path);

  const diff = fileDiff(data1, data2);

  expect(diff).toEqual({
    key1: 'value1',
    '- key2': 'value2',
    '+ key2': 'changedValue2',
  });
});
