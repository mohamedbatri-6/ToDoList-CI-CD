 module.exports = {
   testEnvironment: 'node',
   testMatch: ['**/__tests__/api.test.js'],
   moduleNameMapper: {
     '^@/app/(.*)$': '<rootDir>/src/app/$1'
   },
   setupFilesAfterEnv: ['<rootDir>/jest.api.setup.js']
 }
