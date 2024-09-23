import * as esbuild from 'esbuild';

const context = {
    entryPoints: ['src/queryblast.ts'],
    loader: {
        '.node': 'file'
    },
    sourcemap: true,
    bundle: true,
    logLevel: 'error',
    platform: 'node',
    outfile: '.esbuild/.build/src/queryblast.js'
};

if (process.env.WATCH === 'true') {
    await (await esbuild.context(context)).watch();
} else {
    await esbuild.build(context);
}
