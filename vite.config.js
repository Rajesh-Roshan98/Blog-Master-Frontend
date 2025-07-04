import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Blog-Master-Frontend/', // 🔥 must match GitHub repo name exactly (case-sensitive)
  plugins: [react(), tailwindcss()],
});
