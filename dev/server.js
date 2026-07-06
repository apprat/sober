import http from 'http'
import fs from 'fs'
import path from 'path'
import markdownIt from 'markdown-it'
import url from 'url'
import childProcess from 'child_process'
import * as shiki from 'shiki'
import { transformerNotationHighlight } from '@shikijs/transformers'
import { watch } from './esbuild.js'

watch()
//const tsc = childProcess.exec('npx tsc -w', { cwd: './', windowsHide: true })
//tsc.stdout.on('data', buf => process.stdout.write(buf))
//tsc.stderr.on('data', buf => process.stderr.write(buf))

const highlighter = await shiki.createHighlighter({
  themes: ['github-dark'],
  langs: ['shell', 'json', 'js', 'javascript', 'jsx', 'ts', 'typescript', 'tsx', 'css', 'xml', 'html', 'vue'],
})

const mineTypeMap = {
  html: 'text/html;charset=utf-8',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  js: '	application/javascript',
  map: 'application/x-navimap',
  css: 'text/css;charset=utf-8',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  zip: 'application/zip',
  ttf: 'font/ttf',
  woff: 'font/woff',
  woff2: 'font/woff2',
}

function highlight(v, lang = 'html') {
  return highlighter.codeToHtml(v.trim(), { lang, theme: 'github-dark', transformers: [transformerNotationHighlight()] })
}

const md = markdownIt({ html: true })

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]
  const [lang, ...options] = token.info.split(' ')
  if (lang === 'html' && options.includes('preview')) {
    return `<div class="preview">
    <div class="view${options.includes('block') ? ' block' : ''}${options.includes('center') ? ' center' : ''}">${token.content}</div>
    <details>
      <summary>查看代码</summary>
      ${highlight(token.content)}
    </details>
    </div>`
  }
  return highlight(token.content, lang)
}

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../')
const virtualDir = ['docs', 'dist', 'styles']

const port = process.env.PORT || 1996
const server = http.createServer((_, res) => {
  const url = new URL(res.req.url, 'http://localhost')
  let filename = path.resolve(root, 'test', url.pathname.slice(1))
  for (const dir of virtualDir) {
    if (url.pathname.startsWith(`/${dir}/`)) {
      filename = path.resolve(root, url.pathname.slice(1))
      break
    }
  }
  const extname = path.extname(filename).slice(1)
  if (!fs.existsSync(filename) || !fs.lstatSync(filename).isFile()) return res.end('404')
  if (mineTypeMap[extname]) res.setHeader('Content-Type', mineTypeMap[extname])
  if (extname === 'md') {
    //{% content %}
    const content = md.render(fs.readFileSync(filename, 'utf-8'))
    const template = fs.readFileSync(path.resolve(root, 'test', 'preview.html'), 'utf-8')
    const t = template.replace('{% content %}', content).replace('{% title %}', filename)
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.end(t)
  }
  fs.createReadStream(filename).pipe(res)
})
server.listen(port, () => console.info(`➜Local: http://localhost:${port}/index.html`))