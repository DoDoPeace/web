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
  },
   // 代理配置
    server: {
    // https: true,
    proxy: {
      '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: 'http://127.0.0.1:3007', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
        ws: true,  // 允许websocket代理
		// 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: (path) => path.replace(/^\/api/, "/api")
      }
      },
  }
})

