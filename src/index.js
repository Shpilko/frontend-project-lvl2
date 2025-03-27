import parser from '../src/parser.js'
import _ from 'lodash';

export default (filepath1, filepath2) => {
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

    return `{\n${result}\n}`.split(',').join('\n');
};