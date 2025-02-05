// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [vue(), commonjs()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8080
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true } // Change
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/resources/variables.scss";'
      }
    }
  }
})
