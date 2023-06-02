const config = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    'Components/(.*)': '<rootDir>/src/components/$1',
    'Utility/(.*)': '<rootDir>/src/utility/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};

module.exports = config;
