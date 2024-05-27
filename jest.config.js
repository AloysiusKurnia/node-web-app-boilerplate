/* eslint-disable no-undef */
module.exports = {
    transform: {
        "\\.ts$": "esbuild-runner/jest",
    },
    clearMocks: true,
    collectCoverageFrom: [
        'src/main/**/*.ts',
        '!src/main/**/*.d.ts'
    ]
};