import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/client/dist/',

  build: {
    //emptyOutDir: false, // Prevents Vite from wiping dist/
    rollupOptions: {
      output: {
        // Static names for entry JS chunks
        entryFileNames: 'assets/app.js',
        // Static names for dynamically imported code-split chunks
        chunkFileNames: 'assets/style.js',
        // Static names for CSS, images, fonts, etc.
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})


// from freddy 
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
 
// export default defineConfig({
//   plugins: [react()],
//   base: '/client/dist/',
//   build: {
//     rollupOptions: {
//       output: {
//         entryFileNames: 'assets/app.js',
//         assetFileNames: (assetInfo) => {
//           if (assetInfo.name?.endsWith('.css')) {
//             return 'assets/style.css'
//           }
 
//           return 'assets/[name][extname]'
//         }
//       }
//     }
//   }
// })