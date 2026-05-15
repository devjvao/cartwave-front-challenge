const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const customConfig = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^next-intl/server$': '<rootDir>/src/__mocks__/next-intl-server.tsx',
    },
};

module.exports = async () => {
    const config = await createJestConfig(customConfig)();
    config.transformIgnorePatterns = [
        '/node_modules/(?!(next-intl|use-intl|@formatjs|intl-messageformat)/)/',
    ];
    return config;
};
