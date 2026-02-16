/*
  This is an ESLint configuration file, it checks our code for common bugs and 
  enforces code consistency for our team. We can make rules that can be set to a severity
  level (off, warn, or error). Warnings are reported, and errors can make the lint
  command fail. If our project CI is set up to require linting, an error rule can block a
  commit or build. We can add project-specific rules to prevent recurring
  bugs we notice while developing Savvy!
*/


// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);
