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

console.log('tsc...')
childProcess.execSync('npx tsc')
console.log('esbuild...')
await esbuild.build({
  entryPoints: ['./dist/**/**.js'],
  outdir: 'dist',
  platform: 'browser',
  format: 'esm',
  allowOverwrite: true,
  sourcemap: true,
  plugins: [replacePlugin],
})

const data = {
  './dev/bundle-main.js': 'dist/sober.min.js',
  './dev/bundle-theme.js': 'dist/theme.min.js',
  './dev/bundle-fluent.js': 'dist/design/fluent.min.js',
  './dev/bundle-material.js': 'dist/design/material.min.js'
}
const promises = []
for (const entry in data) {
  const out = esbuild.build({
    entryPoints: [entry],
    bundle: true,
    outfile: data[entry],
    platform: 'browser',
    allowOverwrite: true,
    minify: true,
    legalComments: 'none'
  })
  out.then(() => console.log(`${entry} completed.`))
  promises.push(out)
}
await Promise.all(promises)
console.log('build completed')