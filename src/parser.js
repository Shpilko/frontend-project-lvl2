import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (file) => {
    const format = file.split('.')[1];
    const absolutePath = path.resolve(process.cwd(), file);
    const data = readFileSync(absolutePath, 'utf8')

    switch (true) {
        case format === 'json':
            return JSON.parse(data);

        case format === 'yml':
            return yaml.load(data);

        case format === 'yaml':
            return yaml.load(data);
        default:
            throw new Error(`format ${format} is not supported`);
    }
};
