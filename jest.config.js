const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig');

const mapperPrefix = '<rootDir>/';

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: mapperPrefix}),
};
