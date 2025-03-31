import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parse from './parser.js';
import format from './formatters/index.js';

const getAbsolutePath = (filepath) => {
    const currentPath = path.resolve(process.cwd(), filepath);
    const fixturesPath = path.resolve(process.cwd(), '__fixtures__', filepath);
    return fs.existsSync(currentPath) ? currentPath : fixturesPath;
};

const readFile = (filepath) => {
    const absolutePath = getAbsolutePath(filepath);
    return fs.readFileSync(absolutePath, 'utf-8');
};
const getFormat = (filename) => filename.split('.')[1];

const genDiff = (filepath1, filepath2, nameOfFormat = 'stylish') => {
    const content1 = readFile(filepath1);
    const content2 = readFile(filepath2);
    const data1 = parse(content1, getFormat(filepath1));
    const data2 = parse(content2, getFormat(filepath2));
    const tree = buildTree(data1, data2);
    return format(tree, nameOfFormat);
};
export default genDiff;