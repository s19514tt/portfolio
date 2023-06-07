import { compile } from 'blve'
import { Plugin } from 'vite'

export function blve(): Plugin {
  const cssCodeMap = new Map()

  return {
    name: 'vite-plugin-blve', // プラグイン名
    resolveId(id) {
      const [filename, query] = id.split(`?`, 2)
      if (filename.endsWith('.blv') && query === 'style') {
        return id // Resolve our virtual module
      }
    },
    async transform(code, id: string) {
      if (id.endsWith('.blv')) {
        // .blvファイルに対する処理
        const result = compile(code)
        if (result.css) {
          cssCodeMap.set(id, result.css) // Store the CSS for later
          return {
            code: `import '${id}?style.css';\n${result.js}`, // Import the virtual CSS module
          }
        }
        return {
          code: result.js,
        }
      }
    },
    load(id) {
      if (id.endsWith('.blv?style.css')) {
        return cssCodeMap.get(id.replace('?style.css', '')) // Load the CSS for our virtual module
      }
    },
  }
}
