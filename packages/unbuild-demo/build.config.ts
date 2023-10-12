import { defineBuildConfig } from 'unbuild'

// https://github.com/unjs/unbuild
export default defineBuildConfig({
  entries: [
    './src/index',
    './src/utils',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false,
})
