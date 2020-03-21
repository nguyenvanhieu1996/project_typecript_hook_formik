// {
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "jsx": true,
//     "useJSXTextNode": true
//   },
//   "extends": [
//     "plugin:@typescript-eslint/recommended",
//     "prettier",
//     "prettier/@typescript-eslint"
//   ],
//   "plugins": ["@typescript-eslint", "react-hooks"],
//   "rules": {
//     "@typescript-eslint/explicit-function-return-type": "off",
//     "react-hooks/rules-of-hooks": "error",
//     "react-hooks/exhaustive-deps": "warn"
//   }
// }

module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescipt-eslint/interface-name-prefix': ['always'],
    'no-underscore-dangle': 'error'
  }
};