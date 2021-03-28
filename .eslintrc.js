'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember', 'eslint-plugin-import-helpers'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'ember/no-jquery': 'error',
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          // builtin | external | internal
          ['module'],

          // Testing modules
          [
            '/^qunit/',
            '/^ember-qunit/',
            '/^@ember/test-helpers/',
            '/^ember-exam/',
          ],

          // Ember.js modules
          ['/^ember$/', '/^@ember/', '/^ember-data/'],
          ['/^ember-/'],
          ['absolute'],
          [`/^${require('./package.json').name}\\//`],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          '@typescript-eslint/no-var-requires': 'off',
          // add your custom rules and overrides for node files here
        }
      ),
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
  ],
};
