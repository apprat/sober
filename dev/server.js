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
  console.log('开始编译...')
  const tsc = childProcess.exec('npx tsc --declaration false -w', { cwd: root, windowsHide: true })
  if (!tsc.stdout) throw new Error('tsc.stdout is null')
  const onData = (chunk) => {
    const data = String(chunk).trimEnd()
    const res = /Found ([0-9]) error[s]?. Watching for file changes\.$/g.exec(data)
    if (res) {
      const error = Number(res[1])
      if (error > 0) {
        console.log(`编译失败，错误数量：${error}`)
        tsc.kill()
        process.exit(1)
      }
      console.log('编译完成！')
      tsc.stdout?.removeListener('data', onData)
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
        console.log(`➜Local: http://localhost:${port}/test/index.html`)
        tsc.stdout?.pipe(process.stdout)
      })
    }
  }
  tsc.stdout.addListener('data', onData)
} catch (error) {
  console.error(error)
}