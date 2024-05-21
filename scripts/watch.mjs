// Your bundler file
import { context } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

const ctx = await context({
    entryPoints: ['src/app.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'build/app.js',
    plugins: [nodeExternalsPlugin()],
});
await ctx.watch();