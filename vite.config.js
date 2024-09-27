import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'https://amalebu.github.io/openpeo/',
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './src')
    }
  }
})
