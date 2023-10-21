module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-native-|react-navigation|@react-native|@react-navigation/.*))',
  ],
  setupFiles: ['<rootDir>/.jest/setup.js'],
  coverageDirectory: '<rootDir>/coverage',
};
