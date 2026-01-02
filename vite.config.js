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


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
  
//   // 👇 IMPORTANT: Ensures service worker loads correctly
//   build: {
//     rollupOptions: {
//       input: {
//         main: "index.html",
//         sw: "public/firebase-messaging-sw.js", // include SW in build
//       },
//     },
//   },

//   // 👇 Ensures SW served at correct path
//   publicDir: "public",
//   base: "/oakandsmoke/", 
// });


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],

//   build: {
//     rollupOptions: {
//       input: {
//         main: "index.html",
//         sw: "public/firebase-messaging-sw.js", 
//       },
//     },
//   },

//   publicDir: "public",

//   // IMPORTANT → Your project runs inside /oakandsmoke/
//   base: "/oakandsmoke/",
// });


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],

//   // Put final build inside /dist/oakandsmoke
//   build: {
//     outDir: "dist/oakandsmoke",   // 🔥 REQUIRED
//     rollupOptions: {
//       input: {
//         main: "index.html",
//         sw: "public/firebase-messaging-sw.js",
//       },
//     },
//   },

//   publicDir: "public",

//   // Your app is deployed under /oakandsmoke/
//   base: "/oakandsmoke/",
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Your app runs inside /oakandsmoke/
  base: "/oakandsmoke/",

  // Vite will copy /public/firebase-messaging-sw.js automatically
  publicDir: "public",
});
