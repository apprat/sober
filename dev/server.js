import childProcess from 'child_process'
import http from 'http'
import fs from 'fs'
import path from 'path'

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

try {
  const root = './'
  if (!process.argv.includes('--preview')) {
    const tsc = childProcess.exec('tsc --declaration false -w', { cwd: root, windowsHide: true })
    tsc.stdout?.pipe(process.stdout)
  }
  const server = http.createServer((_, res) => {
    const filename = path.resolve(root, res.req.url.slice(1))
    const extname = path.extname(filename).slice(1)
    if (fs.existsSync(filename) && fs.lstatSync(filename).isFile()) {
      if (mineTypeMap[extname]) res.setHeader('Content-Type', mineTypeMap[extname])
      const stream = fs.createReadStream(filename)
      stream.pipe(res)
      return
    }
    res.end()
  })
  const port = 1996
  server.listen(port, () => {
    setTimeout(() => console.log(`➜  Local:   http://localhost:${port}/test/index.html`), 2500)
  })
} catch (error) {
  console.error(error)
}