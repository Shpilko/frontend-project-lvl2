#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from './fileUtils.js';

const program = new Command();

program
    .version('0.0.1', '-V, --version', 'output the version number')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((filepath1, filepath2, options) => {
        const file1Data = parseFile(filepath1);
        const file2Data = parseFile(filepath2);
        console.log('File 1 Data:', file1Data);
        console.log('File 2 Data:', file2Data);
    });

program.parse();
