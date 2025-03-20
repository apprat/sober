import * as sober from '../dist/main.js'

if (!globalThis.sober) globalThis.sober = {}
globalThis.sober = { ...globalThis.sober, ...sober }