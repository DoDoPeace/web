import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// src 目录的绝对路径
const pathSrc = path.resolve(__dirname, './src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置别名
    alias: {
      // 配置 src 目录的别名为 @
      "@": pathSrc, 
    }
  }
})

