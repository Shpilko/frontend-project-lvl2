import { readFileSync } from 'fs';

export default (filepath1, filepath2) => {
    const file1 = JSON.parse(readFileSync(filepath1, 'utf8'));
    const file2 = JSON.parse(readFileSync(filepath2, 'utf8'));

    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const keys = [...new Set([...keys1, ...keys2])].sort();

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

    return result;
  });

  return `{\n${result}\n}`.split(',').join('\n');
};
