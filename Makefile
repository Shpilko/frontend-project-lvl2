install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/genDiff.js

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

lint:
	npx eslint .