#!/usr/bin/env node

import { Command } from 'commander';

// Создаём объект программы с описанием и версией
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');  // Указываем версию, командный флаг --version будет работать по умолчанию

// Определение справки
program.parse(process.argv);

// Если не были переданы аргументы или нужен вывод справки, выводим справку
if (process.argv.length <= 2) {
    program.outputHelp(); // Выводит справочную информацию, если не переданы аргументы
}
