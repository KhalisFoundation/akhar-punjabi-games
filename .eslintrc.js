module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier', 'eslint-config-prettier'],
  parser: '@babel/eslint-parser',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    "curly": "warn",
    "import/no-unresolved": "off",
    "global-require": 0,
    "react/jsx-no-bind": 0,
    "default-param-last": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "react/function-component-definition": ["error", { "namedComponents": "arrow-function" }],
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "printWidth": 100
      }
    ]
  },
  plugins: ['prettier']
};
