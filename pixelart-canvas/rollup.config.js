import jsx from 'acorn-jsx'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'index.tsx',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  acornInjectPlugins: [
    jsx()
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve(),
    commonjs(),
    typescript(),
  ],
}
