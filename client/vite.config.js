import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 10000,
    proxy:{
      '/api':{
        target:'https://mern-realestate-app-1.onrender.com',
        changeOrigin:true,
        secure:false
      },
    },
  },
  plugins: [react()],
})
