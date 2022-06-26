/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['./**/__test__/*.spec.ts'],
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'd.ts'],
};