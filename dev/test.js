import fs from 'fs'
import path from 'path'

const p = path.resolve('./src')
const x = fs.readdirSync(p)
for (const key of x) {
  if (['core', 'main.ts'].includes(key)) continue
  const name = key.slice(0, -3)
  const docs = path.resolve('docs/zh-cn', `${name}.md`)
  if (!fs.existsSync(docs)) {
    fs.writeFileSync(docs, `# ${name}\n`)
    console.log(`${docs} created`)
  }
}