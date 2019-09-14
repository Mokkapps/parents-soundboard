module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  plugins: ['detox'],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off'
  }
};
