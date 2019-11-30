module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  rules: {
    'prettier/prettier': 'error'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};
