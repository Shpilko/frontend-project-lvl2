import { readFileSync } from 'fs';

import yaml from 'js-yaml';

const getFiles = (data1, data2) => {
  if (data1.endsWith('.json') && data2.endsWith('.json')) {
    const file1 = JSON.parse(readFileSync(data1, 'utf8'));
    const file2 = JSON.parse(readFileSync(data2, 'utf8'));

    return { file1, file2 };
  }

  if ((data1.endsWith('.yml') || data1.endsWith('.yaml')) && (data2.endsWith('.yml') || data2.endsWith('.yaml'))) {
    const file1 = yaml.load(readFileSync(data1, 'utf8'));
    const file2 = yaml.load(readFileSync(data2, 'utf8'));

    return { file1, file2 };
  }

  return null;
};

export default (filepath1, filepath2) => {
  const { file1, file2 } = getFiles(filepath1, filepath2);

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

    return null;
  });

  return `{\n${result}\n}`.split(',').join('\n');
};
