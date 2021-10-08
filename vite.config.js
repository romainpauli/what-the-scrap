import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginEnv from 'vite-plugin-vue-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pluginEnv()
  ]
})
