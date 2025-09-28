module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:playwright/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-no-inline-styles', 'playwright', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'always'],
        'prefer-const': ['error'],
        quotes: ['error', 'single'],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
            },
        ],
        'no-inline-styles/no-inline-styles': 2,
        'no-multi-spaces': ['error'],
        curly: ['error', 'all'],
        'operator-linebreak': ['error', 'after'],
        'no-trailing-spaces': ['error'],
        'no-cond-assign': ['error', 'always'],
        'no-return-assign': ['error', 'always'],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
                fixStyle: 'inline-type-imports',
            },
        ],
        'playwright/expect-expect': 'off',
        'playwright/no-wait-for-timeout': 'off',
    },
    ignorePatterns: ['dist', 'node_modules'],
};
