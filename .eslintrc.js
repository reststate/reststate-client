module.exports = {
  extends: [
    'codingitwrong',
  ],
  parser: 'babel-eslint',
  plugins: [
    'jest',
  ],
  env: {
    'es6': true,
    'jest/globals': true,
    'node': true,
  },
};
