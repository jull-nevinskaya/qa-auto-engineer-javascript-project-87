#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from './fileParser.js';
import fileDiff from './fileDiff.js';
import formatOutput from '../formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'plain') // Добавляем параметр для формата
  .action((filepath1, filepath2, options) => {
    try {
      if (!filepath1 || !filepath2) {
        throw new Error('Both file paths must be provided.');
      }

      const data1 = parseFile(filepath1);
      const data2 = parseFile(filepath2);
      const diff = fileDiff(data1, data2);
      const formattedDiff = formatOutput(diff, options.format);

      console.log(formattedDiff);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      // Вместо process.exit выбрасываем исключение
      throw new Error(error.message);
    }
  });

// Позволяем игнорировать неизвестные опции
program.allowUnknownOption(true);

program.parse();
