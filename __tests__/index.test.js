import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.json', 'stylishResult.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'stylishResult.txt', 'stylish'],
  ['file1.json', 'file2.json', 'plainResult.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'plainResult.txt', 'plain'],
  ['file1.json', 'file2.json', 'jsonResult.txt', 'json'],
  ['file1.yml', 'file2.yml', 'jsonResult.txt', 'json'],
];

test.each(cases)('Compare %s and %s', (fileName1, fileName2, resultFileName, format) => {
  const fixtureFilePath1 = getFixturePath(fileName1);
  const fixtureFilePath2 = getFixturePath(fileName2);
  const result = genDiff(fixtureFilePath1, fixtureFilePath2, format);
  expect(result).toEqual(readFile(resultFileName));
});

test('Default formater.', () => {
  const expected = readFile('stylishResult.txt');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
  expect(actual).toEqual(expected);
});
