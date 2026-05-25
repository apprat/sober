import http from 'http'
import fs from 'fs'
import path from 'path'
import markdownIt from 'markdown-it'
import url from 'url'
import * as shiki from 'shiki'
import { transformerNotationHighlight } from '@shikijs/transformers'

const __dirname = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../')
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
  if (token.info === 'html preview') {
    return `<div class="preview">
    <div class="view">${token.content}</div>
    <details>
      <summary>查看代码</summary>
      ${highlight(token.content)}
    </details>
    </div>`
  }
  if (token.info === 'html preview-only') {
    return `<div class="preview">
    <div class="view">${token.content}</div>
    </div>`
  }
  return highlight(token.content, token.info)
}

const template = fs.readFileSync(path.resolve(__dirname, './test/preview.html'), 'utf-8')

export const useServer = (port) => {
  const server = http.createServer((_, res) => {
    const uri = new URL(res.req.url, 'http://localhost')
    const filename = path.resolve(__dirname, uri.pathname.slice(1))
    const extname = path.extname(filename).slice(1)
    if (!fs.existsSync(filename) || !fs.lstatSync(filename).isFile()) return res.end()
    if (extname === 'md') {
      const content = md.render(fs.readFileSync(filename, 'utf-8'))
      const value = template.replace('{% title %}', filename).replace('{% content %}', content)
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end(value)
    }
    if (mineTypeMap[extname]) res.setHeader('Content-Type', mineTypeMap[extname])
    return fs.createReadStream(filename).pipe(res)
  })
  server.listen(port, () => console.info(`➜Local: http://localhost:${port}/test/index.html`))
}