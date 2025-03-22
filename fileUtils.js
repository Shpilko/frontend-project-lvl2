import fs from 'fs';
import path from 'path';

const parseFile = (filePath) => {
    const absolutePath = path.resolve(process.cwd(), filePath);

    try {
        const data = fs.readFileSync(absolutePath, 'utf8');

        return JSON.parse(data);
    } catch (error) {
        console.error(`Ошибка при чтении или парсинге файла: ${absolutePath}`);
        process.exit(1);
    }
};

export default parseFile;
