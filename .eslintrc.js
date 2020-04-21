module.exports = {
  env: {
    es6: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react-native', 'prettier'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'airtable',
            message: 'Do not use the airtable module outside of airtable.js',
          },
          {
            name: './airtable',
            message: 'Do not use airtable.js outside of request.js',
          },
          {
            name: '../../lib/airtable',
            message: 'Do not use airtable.js outside of request.js',
          },
          {
            name: '../../../lib/airtable',
            message: 'Do not use airtable.js outside of request.js',
          },
        ],
      },
    ],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-use-before-define': ['error', { variables: false }],
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': ['error'],
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': ['on', { forbid: ['any'] }],
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-wrap-multilines': 'off',
  },
};
