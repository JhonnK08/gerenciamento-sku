import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    ignores: ['eslint.config.js']
  },
  {
    languageOptions: {
      globals: {
        ...globals.es2021,
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs', '*.cjs'],
        },
      },
    },
  },
  {
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'prettier/prettier': 'error',
      'object-shorthand': ['error', 'always'],
    },
  },
);
