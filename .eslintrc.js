module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    "import/first": "off",
    "import/no-extraneous-dependencies": "off",
    "space-before-blocks": "off",
    "no-param-reassign": "off",
    "object-property-newline": "off",
    "camelcase": "off",
  },

};
