module.exports = {
  moduleNameMapper: {
    '^.+\.(css|less|scss|sass)$': '<rootDir>/__mocks__/fileMock.js',
    '^.+\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
};
