# Установить стандартную переменную для ESLint
ESLINT = npx eslint

# Цель lint для проверки всех файлов в директории src
lint:
	$(ESLINT) src

# Цель lint-fix для исправления ошибок
lint-fix:
	$(ESLINT) src --fix
