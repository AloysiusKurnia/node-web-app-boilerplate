// Your bundler file
import { context } from 'esbuild';
import { buildSettings } from './settings.mjs';

(await context(buildSettings)).watch();
