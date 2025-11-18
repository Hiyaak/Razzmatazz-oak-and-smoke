// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/oakandsmoke/'
// })


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // LOCAL development config
// export default defineConfig({
//   plugins: [react()],
//   base: "/", // VERY IMPORTANT FOR DEV
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  
  // 👇 IMPORTANT: Ensures service worker loads correctly
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        sw: "public/firebase-messaging-sw.js", // include SW in build
      },
    },
  },

  // 👇 Ensures SW served at correct path
  publicDir: "public",
  base: "/oakandsmoke/", 
});
