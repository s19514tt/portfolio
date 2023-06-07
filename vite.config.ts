import { defineConfig } from 'vite'
import { blve } from './blv-plugin'

export default defineConfig({
  plugins: [blve()],
  base: './',
})
