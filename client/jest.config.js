module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/_setup.tests.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)']
};
