#!/usr/bin/env node

const { Command } = require('commander');
const parseFile = require('./fileParser');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const data1 = parseFile(filepath1);
      const data2 = parseFile(filepath2);

      console.log('Parsed Data from File 1:', data1);
      console.log('Parsed Data from File 2:', data2);

      // Для теста выводим, что файлы успешно считаны
      console.log('Comparison not implemented yet');
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })
  .parse(process.argv);
