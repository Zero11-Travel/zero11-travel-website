// Post-build step for `pnpm build:static` (drag-and-drop / pure static hosting).
// The SSR presets get the security headers from Nitro's routeRules; the static
// preset does not write them, so append them to the generated _headers file here.
import { appendFileSync, existsSync, writeFileSync } from 'node:fs'

const file = '.output/public/_headers'
const block = `
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`

if (existsSync(file)) appendFileSync(file, block)
else writeFileSync(file, block.trimStart())
console.log(`Static build finalized: security headers written to ${file}`)
