import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Глобальные переменные для браузера
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Переменные браузера
        ...globals.node,    // Переменные Node.js (если нужен серверный код)
      },
    },
  },
  // Базовые рекомендованные правила
  pluginJs.configs.recommended,
  // Дополнительные настройки
  {
    rules: {
      // Примеры правил
      "semi": ["error", "always"], // Требовать точки с запятой
      "no-unused-vars": "warn", // Предупреждение для неиспользуемых переменных
    },
  },
];
