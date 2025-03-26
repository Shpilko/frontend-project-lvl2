#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import parser from '../src/parser.js'
import _ from 'lodash';

const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        const file1 = parser(filepath1);
        const file2 = parser(filepath2);

        const keys1 = Object.keys(file1);
        const keys2 = Object.keys(file2);
        const keys = _.sortBy([...new Set([...keys1, ...keys2])]);

        const result = keys.map((key) => {
            if (keys1.includes(key) && !keys2.includes(key)) {
                return `  - ${key}: ${file1[key]}`;
            }
            if (keys1.includes(key) && keys2.includes(key) && file1[key] === file2[key]) {
                return `    ${key}: ${file1[key]}`;
            }
            if (keys1.includes(key) && keys2.includes(key) && file1[key] !== file2[key]) {
                return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
            }
            if (!keys1.includes(key) && keys2.includes(key)) {
                return `  + ${key}: ${file2[key]}`;
            }

            return null;
        });

        console.log(`{\n${result}\n}`.split(',').join('\n'));
        return `{\n${result}\n}`.split(',').join('\n');
    });

program.parse();