import esbuild from 'esbuild'
import childProcess from 'child_process'
import fs from 'fs'
import postcss from 'postcss'
import postcssNested from 'postcss-nested'
import cssnano from 'cssnano'
import safeParser from 'postcss-safe-parser'
import { minify } from 'html-minifier'
import path from 'path'

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
    build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
      let contents = fs.readFileSync(args.path, 'utf8')
      const cssReg = /\/\*css\*\/\s*`\s*((?:\\`|[^`])*?)\s*`(\s*;)?(?=\r?\n|$)/g;
      const htmlReg = /\/\*html\*\/\s*`\s*((?:\\`|[^`])*?)\s*`(\s*;)?(?=\r?\n|$)/g;
      contents = await asyncReplace(contents, cssReg, async (match) => {
        const varMap = new Map()
        //--/\${["']?(.*?)["']? \/\*.*?\*\/}/g, '$1')
        //--/\/\*html\*\/(?:\s*)`([\s\S]*?)`;/g
        const css = match[1]
        const markCss = css.replace(/\$\{[^}]*\}/g, (match) => {
          const key = `__VAR_MASK_${varMap.size}_END`
          varMap.set(key, match)
          return key
        })
        let minCss = await postcssor.process(markCss, { from: undefined, parser: safeParser }).css
        varMap.forEach((origin, mask) => minCss = minCss.replaceAll(mask, origin))
        return `\`${minCss}\`\n`
      })
      contents = contents.replace(htmlReg, (_, html) => `\`${minify(html, { collapseWhitespace: true }).trim()}\`\n`)
      const loader = path.extname(args.path).slice(1)
      return { contents, loader }
    })
  }
}

const options = {
  outdir: 'dist',
  platform: 'browser',
  format: 'esm',
  allowOverwrite: true,
  sourcemap: true,
  plugins: [
    replacePlugin,
  ]
}

export const watch = async () => {
  const ctx = await esbuild.context({ ...options, entryPoints: ['./src/**/*.ts'] })
  await ctx.watch()
  console.log('✅ esbuild listening...')
  process.on('SIGINT', async () => {
    await ctx.dispose()
    process.exit(0)
  })
}

const data = {
  './dev/bundle-main.js': 'dist/sober.min.js',
  './dev/bundle-theme.js': 'dist/theme.min.js',
  './dev/bundle-fluent.js': 'dist/designs/fluent.min.js'
}

export const build = async () => {
  console.log('tsc...')
  childProcess.execSync('npx tsc')
  console.log('tsc completed.')
  console.log('esbuild...')
  await esbuild.build({ ...options, entryPoints: ['./dist/**/*.js'] })
  console.log('esbuild completed.')
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
    out.then(() => console.log(`${entry} build completed.`))
    promises.push(out)
  }
  await Promise.all(promises)
  console.log('build completed')
}