import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:{
      '@':resolve(__dirname,'./src'),
      "heart-message":resolve(__dirname,'./heart-message'),
      "heart-utils":resolve(__dirname,'./heart-utils'),
      "heart-hls":resolve(__dirname,'./heart-hls'),
      "heart-mp4":resolve(__dirname,'./heart-mp4'),
      
    }
  },
})
