#!/usr/bin/env node

import fs from 'fs/promises'
import { globIterate } from 'glob'
import { minify }  from 'terser'

async function main() {
  for await (const path of globIterate("internal/**/*.js")) {
    const code = await fs.readFile(path);

    const result = await minify(String(code), {
      compress: false,
      mangle: false,
      output: {
        comments: false
      }
    })

    await fs.writeFile(path, result.code);
  }
}

main();
