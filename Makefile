# Makefile

# Установка зависимостей с помощью npm ci
install:
	npm ci

# Сделать gendiff.js исполняемым
chmod:
	chmod +x gendiff.js

# Запуск команды gendiff (вывод справки)
gendiff:
	./gendiff.js -h
