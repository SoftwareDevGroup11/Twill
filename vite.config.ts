import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/Twill/',
    plugins: [react()],
    assetsInclude: ['**/*.wasm'],
})
