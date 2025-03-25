import { readFileSync } from 'fs';
import path from 'path';

export default (file) => {
    const format = file.split('.')[1];
    const absolutePath = path.resolve(process.cwd(), file);
    const data = readFileSync(absolutePath, 'utf8')

    switch (format) {
        case 'json':
            return JSON.parse(data);
        default:
            throw new Error(`format ${format} is not supported`);
    }
};
