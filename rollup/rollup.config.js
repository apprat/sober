import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
export default defineConfig({
  input: './rollup/main.js',
  output: {
    file: 'dist/bundle.min.js',
    format: 'umd',
    sourcemap: true,
    name: 'Sober'
  },
  plugins: [nodeResolve(), uglify()]
})