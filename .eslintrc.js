module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['html'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': 0,
    'linebreak-style': 0,
    'template-curly-spacing': 'off',
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'no-unused-vars': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'object-curly-newline': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/label-has-for': 'off',
  },
};
