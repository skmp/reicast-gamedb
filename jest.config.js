/* eslint-disable */

module.exports = {
  'globals': {
    '__DEV__': true
  },
  'verbose': true,
  'testURL': 'http://localhost/',
  'testMatch': [
    '**/tests/**/*.(spec|test).js|**/__tests__/*.js'
  ],
  'testPathIgnorePatterns': [
    '<rootDir>/dist/',
    '<rootDir>/docs/'
  ],
  'moduleFileExtensions': [
    'js',
    'json',
    'vue'
  ],
  'moduleNameMapper': {
    "^@/(.*)$": "<rootDir>/src/$1",
    '^vue$': 'vue/dist/vue.common.js',
    'quasar': 'quasar-framework/dist/umd/quasar.mat.umd.min.js'
  },
  'resolver': null,
  'transformIgnorePatterns': [
    'node_modules/core-js',
    'node_modules/babel-runtime',
    'node_modules/lodash',
    'node_modules/vue'
  ],
  'transform': {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  'snapshotSerializers': [
    '<rootDir>/node_modules/jest-serializer-vue'
  ],
  'setupTestFrameworkScriptFile': '<rootDir>/node_modules/jest-expect-message',
  'collectCoverage': true,
  'coverageDirectory': '<rootDir>/test-coverage-report',
  'collectCoverageFrom': [
    '<rootDir>/src/**/*.{js}',
    '<rootDir>/src/**/*.{vue}',
  ],
}
