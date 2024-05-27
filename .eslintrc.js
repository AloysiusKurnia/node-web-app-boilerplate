/* eslint-disable no-undef */
module.exports = {
    root: true,
    extends: [
        'eslint:recommended'
    ],
    "overrides": [
        {
            "files": ["**/*.ts", "**/*.tsx"],
            "env": { "browser": true, "es6": true, "node": true },
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "ecmaFeatures": { "jsx": true },
                "ecmaVersion": 2018,
                "sourceType": "module",
                "project": "./tsconfig.json"
            },
            "plugins": ["@typescript-eslint"],
            "rules": {
                "@typescript-eslint/no-unused-vars": [
                    "warn", // or "error"
                    {
                        "argsIgnorePattern": "^_",
                        "varsIgnorePattern": "^_",
                        "caughtErrorsIgnorePattern": "^_"
                    }
                ]
            }
        }
    ]
};