import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'Youtubesearchapp-API', // Tên repository chính xác của bạn trên GitHub
})