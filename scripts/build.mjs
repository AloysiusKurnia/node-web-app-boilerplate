// Your bundler file
import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

build({
    entryPoints: ['src/app.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'build/app.js',
    plugins: [nodeExternalsPlugin()],
});