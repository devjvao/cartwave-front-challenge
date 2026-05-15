import nextConfig from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
    ...nextConfig,
    ...nextTypescript,
    {
        files: ['jest.config.js'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ForInStatement',
                    message: 'for...in is banned — use Object.keys(), Object.entries(), or for...of.',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {prefer: 'type-imports', fixStyle: 'inline-type-imports'},
            ],
        },
    },
];

export default eslintConfig;
