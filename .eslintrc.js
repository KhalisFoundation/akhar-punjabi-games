module.exports = {
  extends: 'airbnb',
  ignorePatterns: ['node_modules/**/*', '.expo-shared/**/*', 'babel.config.js', '.eslintrc.js'],
  plugins: [
    'react',
    'react-native',
    'react-hooks'
  ],
  parser: 'babel-eslint',
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'global-require': 'off',
    "import/prefer-default-export": "off",
  },
  globals: {
    fetch: false
  }
};
