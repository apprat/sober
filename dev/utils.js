import http from 'http'
import fs, { readSync } from 'fs'
import path from 'path'
import markdownIt from 'markdown-it'
import url from 'url'

const __dirname = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../')

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

function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

const md = markdownIt({ html: true })

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]
  const html = escapeHtml(token.content)
  if (token.info !== 'html preview') return `<pre>${html}</pre>`
  return `<div class="preview">
    <div class="view">${token.content}</div>
    <details>
      <summary>查看代码</summary>
      <pre>${html}</pre>
    </details>
  </div>`
}

export const useServer = (port) => {
  const server = http.createServer((_, res) => {
    const uri = new URL(res.req.url, 'http://localhost')
    const filename = path.resolve(__dirname, uri.pathname.slice(1))
    const extname = path.extname(filename).slice(1)
    if (!fs.existsSync(filename) || !fs.lstatSync(filename).isFile()) return res.end()
    if (extname === 'md') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end(md.render(fs.readFileSync(filename, 'utf-8')))
    }
    if (mineTypeMap[extname]) res.setHeader('Content-Type', mineTypeMap[extname])
    return fs.createReadStream(filename).pipe(res)
  })
  server.listen(port, () => console.info(`➜Local: http://localhost:${port}/test/index.html`))
}