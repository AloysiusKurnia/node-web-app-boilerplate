import { nodeExternalsPlugin } from 'esbuild-node-externals';

export const buildSettings = {
    entryPoints: ['src/main/app.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'build/app.js',
    plugins: [nodeExternalsPlugin()],
    sourcemap: 'inline',
};