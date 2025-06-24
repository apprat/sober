import esbuild from 'esbuild'
import childProcess from 'child_process'
import fs from 'fs'
import postcss from 'postcss'
import postcssNested from 'postcss-nested'
import cssnano from 'cssnano'
import { minify } from 'html-minifier'

const asyncReplace = async (str, regex, asyncProcessor) => {
  const matches = []
  const regexGlobal = new RegExp(regex, 'g')
  let match
  while ((match = regexGlobal.exec(str)) !== null) matches.push(match)
  const replacements = await Promise.all(matches.map(match => asyncProcessor(match)))
  let result = str
  for (let i = 0; i < matches.length; i++) {
    const replacement = replacements[i]
    result = result.replace(matches[i][0], replacement)
  }
  return result
}

const postcssor = postcss([postcssNested, cssnano()])

const replacePlugin = {
  name: 'replace-plugin',
  setup(build) {
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      let contents = fs.readFileSync(args.path, 'utf8')
      contents = await asyncReplace(contents, /\/\*(?:s|)css\*\/(?:\s*)`([\s\S]*?)`;/g, async (match) => {
        const css = match[1].replace(/\${["']?(.*?)["']? \/\*.*?\*\/}/g, '$1')
        const res = await postcssor.process(css, { from: undefined })
        return `\`${res.css}\``
      })
      contents = contents.replace(/\/\*html\*\/(?:\s*)`([\s\S]*?)`;/g, (_, html) => {
        return `\`${minify(html, { collapseWhitespace: true }).trim()}\``
      })
      return { contents }
    })
  }
}

console.log('start tsc')
childProcess.execSync('npx tsc')
console.log('start esbuild')
await esbuild.build({
  entryPoints: ['./dist/**/**.js'],
  outdir: 'dist',
  platform: 'browser',
  format: 'esm',
  allowOverwrite: true,
  sourcemap: true,
  plugins: [replacePlugin],
})
console.log('start bundle')
await esbuild.build({
  entryPoints: ['./dev/pro-bundle-mian.js'],
  bundle: true,
  outfile: 'dist/sober.min.js',
  platform: 'browser',
  allowOverwrite: true,
  minify: true,
  sourcemap: true,
})
console.log('Build completed.')