// /* public/firebase-messaging-sw.js */

// importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log("📩 Background message:", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });



// /* public/firebase-messaging-sw.js */
// importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// // firebase.initializeApp({
// //   apiKey: "AIzaSyDR81-roHW4PZwMbfrPoyIzfkP8dHRnqkY",
// //   authDomain: "react-js-email-nofification.firebaseapp.com",
// //   projectId: "react-js-email-nofification",
// //   storageBucket: "react-js-email-nofification.firebasestorage.app",
// //   messagingSenderId: "423496412869",
// //   appId: "1:423496412869:web:dee7397c80e1e0813b8aac"
// // });

// const firebaseConfig = {
//   apiKey: "AIzaSyB3csmb87BiG1wvTXwbbkN2ZUfK9QH0-Vw",
//   authDomain: "razzmatazz-e9feb.firebaseapp.com",
//   projectId: "razzmatazz-e9feb",     // ✔ FIXED
//   storageBucket: "razzmatazz-e9feb.firebasestorage.app",
//   messagingSenderId: "1011542027358",
//   appId: "1:1011542027358:web:e06b1e92611486f8e618cf",
//   measurementId: "G-RRMM68GQWM"
// };


// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log("📩 Background message:", payload);

//   // self.registration.showNotification(payload.notification.title, {
//   //   body: payload.notification.body,
//   //   icon: "/firebase-logo.png"
//    self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: "/logo192.png",
//   });
// });


// importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyB3csmb87BiG1wvTXwbbkN2ZUfK9QH0-Vw",
//   authDomain: "razzmatazz-e9feb.firebaseapp.com",
//   projectId: "razzmatazz-e9feb",
//   storageBucket: "razzmatazz-e9feb.firebasestorage.app",
//   messagingSenderId: "1011542027358",
//   appId: "1:1011542027358:web:e06b1e92611486f8e618cf",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log("Background Message:", payload);

//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: "/logo192.png",
//   });
// });


/* public/firebase-messaging-sw.js */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB3csmb87BiG1wvTXwbbkN2ZUfK9QH0-Vw",
  authDomain: "razzmatazz-e9feb.firebaseapp.com",
  projectId: "razzmatazz-e9feb",
  storageBucket: "razzmatazz-e9feb.firebasestorage.app",
  messagingSenderId: "1011542027358",
  appId: "1:1011542027358:web:e06b1e92611486f8e618cf",
  measurementId: "G-RRMM68GQWM"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
