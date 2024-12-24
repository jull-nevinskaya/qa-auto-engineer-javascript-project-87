import { test, expect } from '@jest/globals';
import formatPlain from '../formatters/plain.js';

test('Форматер plain: базовый случай', () => {
  const diff = {
    'host': 'hexlet.io',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
    '- proxy': '123.234.53.22',
  };

  const expected = [
    "Property 'timeout' was updated. From 50 to 20",
    "Property 'verbose' was added with value: true",
    "Property 'proxy' was removed",
  ].join('\n');

  expect(formatPlain(diff)).toEqual(expected);
});
