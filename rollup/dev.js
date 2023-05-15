import childProcess from 'child_process'

try {
  const path = './'
  childProcess.execSync('tsc', { cwd: path, windowsHide: true, stdio: 'inherit' })
  const tsc = childProcess.exec('npx tsc -w', { cwd: path, windowsHide: true })
  tsc.stdout?.pipe(process.stdout)
  const rollup = childProcess.exec('npx rollup --config rollup/rollup.config.js -w', { cwd: path, windowsHide: true })
  rollup.stdout?.pipe(process.stdout)
  process.on('exit', () => {
    tsc.kill()
    rollup.kill()
  })
} catch (error) {
  console.error(error)
}
