import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import svger from '@svgr/rollup'

export default defineConfig({
  input: './rollup/main.js',
  output: {
    file: 'dist/bundle.min.js',
    format: 'umd',
    name: 'matter',
    sourcemap: true
  },
  plugins: [nodeResolve(), uglify(), svger()]
})