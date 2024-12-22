#!/usr/bin/env node

const { Command } = require('commander');
const parseFile = require('./fileParser');
const fileDiff = require('./fileDiff');
const formatOutput = require('../formatters/index'); // Импортируем модуль для форматирования

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'plain') // Добавляем параметр для формата
  .action((filepath1, filepath2, options) => {
    try {
      const data1 = parseFile(filepath1);
      const data2 = parseFile(filepath2);

      const diff = fileDiff(data1, data2); // Сравниваем два файла
      const formattedDiff = formatOutput(diff, options.format); // Форматируем результат

      console.log(formattedDiff);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })
  .parse(process.argv);
