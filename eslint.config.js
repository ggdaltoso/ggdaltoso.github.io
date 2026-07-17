'use strict';

const globals = require('globals');
const react = require('eslint-plugin-react');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    ignores: ['public/**', 'node_modules/**', '.cache/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        graphql: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'comma-dangle': 0,
      'import/imports-first': 0,
      'global-require': 0,
      'class-methods-use-this': 0,
      'arrow-body-style': [2, 'as-needed'],
      'arrow-parens': ['error', 'always'],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'no-debugger': 0,
      'dot-notation': 0,
      'no-console': 0,
      'new-cap': 0,
      strict: 0,
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],
      'no-underscore-dangle': 0,
      'no-use-before-define': 0,
      'eol-last': 0,
      'no-shadow': 0,
      quotes: [2, 'single'],
      'jsx-quotes': [0, 'prefer-single'],
      'react/jsx-no-undef': 1,
      'react/jsx-uses-react': 1,
      'react/jsx-uses-vars': 1,
    },
  },
];
