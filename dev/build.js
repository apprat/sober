import esbuild from 'esbuild'
import childProcess from 'child_process'
import { minify } from 'html-minifier'
import fs from 'fs'

const replacePlugin = {
  name: 'replace-plugin',
  setup(build) {
    build.onLoad({ filter: /\.js$/ }, (args) => {
      let contents = fs.readFileSync(args.path, 'utf8')
      const cssRegex = /\/\*css\*\/ `([\s\S]*?)`/g
      contents = contents.replace(cssRegex, (_, css) => {
        css = css.replace(/\${(.*?) \/\*(.*?)\*\/}/g, (_, v) => v.startsWith('"') && v.endsWith('"') ? v.slice(1, -1) : v)
        const res = esbuild.transformSync(css, { loader: 'css', minify: true })
        return `\`${res.code.trim()}\``
      })
      const htmlRegex = /\/\*html\*\/ `([\s\S]*?)`/g
      contents = contents.replace(htmlRegex, (_, html) => {
        return `\`${minify(html, { collapseWhitespace: true })}\``
      })
      return {
        contents: contents,
        loader: 'js'
      }
    })
  }
}


childProcess.execSync('tsc')
esbuild.build({
  entryPoints: ['./dist/**/**.js'],
  bundle: false,
  outdir: 'dist',
  platform: 'browser',
  allowOverwrite: true,
  minify: true,
  sourcemap: true,
  plugins: [replacePlugin],
}).then(() => {
  esbuild.build({
    entryPoints: ['./dist/main.js'],
    bundle: true,
    outfile: 'dist/sober.min.js',
    platform: 'browser',
    allowOverwrite: true,
    minify: true,
    sourcemap: true,
  }).then(() => console.log('Build completed.'))
})