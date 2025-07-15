import * as theme from '../dist/theme.js'

if (!globalThis.sober) globalThis.sober = {}
globalThis.sober = { ...globalThis.sober, theme }