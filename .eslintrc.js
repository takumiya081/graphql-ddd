const path = require('path');

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es6: true,
    'jest/globals': true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/docstyle': ['jsdoc', 'tomdoc'],
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts'],
      },
      typescript: {
        project: path.join(__dirname, 'tsconfig.json'),
      },
    },
  },
  parserOptions: {
    // Only ESLint 6.2.0 and later support ES2020.
    ecmaVersion: 2020,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'jest'],
  rules: {
    'import/extensions': OFF,
    '@typescript-eslint/no-explicit-any': WARN,
    '@typescript-eslint/ban-ts-comment': OFF,
    '@typescript-eslint/ban-ts-ignore': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-unused-vars': [ERROR, {argsIgnorePattern: '^_'}],
    'no-plusplus': OFF,
    // no default export
    'import/prefer-default-export': OFF,
    'import/no-default-export': ERROR,
    'import/no-deprecated': ERROR,
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'sort-imports': OFF,
    'simple-import-sort/sort': ERROR,
    'import/order': OFF,
    // https://github.com/typescript-eslint/typescript-eslint/blob/v3.9.0/packages/eslint-plugin/docs/rules/ban-types.md
    '@typescript-eslint/ban-types': [
      'warn',
      {
        extendDefaults: true,
        types: {
          // object typing
          Object: {
            message: [
              'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join('\n'),
          },
          '{}': {
            message: [
              '`{}` actually means "any non-nullish value".',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join('\n'),
          },
          object: {
            message: [
              'The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).',
              'Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.',
            ].join('\n'),
          },
        },
      },
    ],
    'node/no-unsupported-features/es-syntax': OFF,
    'node/no-missing-import': OFF,
    'no-underscore-dangle': OFF,
    'node/no-unpublished-import': OFF,
    'import/no-extraneous-dependencies': [ERROR, {devDependencies: ['**/*.test.ts', '**/__testHelpers/**/*']}],
  },
};
