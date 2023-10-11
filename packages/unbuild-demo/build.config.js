import { defineBuildConfig } from 'unbuild';
// https://github.com/unjs/unbuild
export default defineBuildConfig({
    entries: [
        'src/index',
    ],
    clean: true,
    declaration: true,
    rollup: {
        emitCJS: true,
    },
});
