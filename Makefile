install:
    npm ci

publish:
    npm publish --dry-run

link:
    npm link

gendiff:
    bin/gendiff.js

link:
    npm link

lint:
    npx eslint .

lint-fix:
    npx eslint . --fix