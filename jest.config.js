 const nextJest = require('next/jest')

 const createJestConfig = nextJest({
   dir: './',
 });

 const customJestConfig = {
   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   testEnvironment: 'jest-environment-jsdom',
   moduleDirectories: ['node_modules', '<rootDir>/'],
   moduleNameMapper: {
     '^@/app/(.*)$': '<rootDir>/src/app/$1',
     '^@/components/(.*)$': '<rootDir>/src/app/components/$1'
   }
 }

 module.exports = createJestConfig(customJestConfig)

 
