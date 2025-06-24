import childProcess from 'child_process'
import { useServer } from './utils.js'

useServer(1996)

const tsc = childProcess.exec('npx tsc --declaration false -w', { cwd: './', windowsHide: true })
if (tsc.stdout) tsc.stdout.pipe(process.stdout)