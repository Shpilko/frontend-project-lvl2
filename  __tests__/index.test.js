import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');

const yamlFile1 = getFixturePath('file1.yml');
const yamlFile2 = getFixturePath('file2.yml');

const resultDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff', () => {
    expect(genDiff(jsonFile1, jsonFile2)).toBe(resultDiff);
    expect(genDiff(yamlFile1, yamlFile2)).toBe(resultDiff);
});