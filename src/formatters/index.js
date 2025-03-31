import stylish from './stylish.js';
import plain from './plain.js';

const format = (tree, type) => {
    switch (type) {
        case 'stylish':
            return stylish(tree);
        case 'plain':
            return plain(tree);
        default:
            throw new Error(`format ${type} is not supported`);
    }
};
export default format;