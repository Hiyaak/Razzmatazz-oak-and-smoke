// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyDR81-roHW4PZwMbfrPoyIzfkP8dHRnqkY",
//   authDomain: "react-js-email-nofification.firebaseapp.com",
//   projectId: "react-js-email-nofification",
//   storageBucket: "react-js-email-nofification.firebasestorage.app",
//   messagingSenderId: "423496412869",
//   appId: "1:423496412869:web:dee7397c80e1e0813b8aac",
//   measurementId: "G-P0989PMYJM",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Messaging
// export const messaging = getMessaging(app);


// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyDR81-roHW4PZwMbfrPoyIzfkP8dHRnqkY",
//   authDomain: "react-js-email-nofification.firebaseapp.com",
//   projectId: "react-js-email-nofification",
//   storageBucket: "react-js-email-nofification.firebasestorage.app",
//   messagingSenderId: "423496412869",
//   appId: "1:423496412869:web:dee7397c80e1e0813b8aac",
// };

// const app = initializeApp(firebaseConfig);

// export const messaging = getMessaging(app);


import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyDR81-roHW4PZwMbfrPoyIzfkP8dHRnqkY",
//   authDomain: "react-js-email-nofification.firebaseapp.com",
//   projectId: "react-js-email-nofification",
//   storageBucket: "react-js-email-nofification.firebasestorage.app",
//   messagingSenderId: "423496412869",
//   appId: "1:423496412869:web:dee7397c80e1e0813b8aac",
// };



const firebaseConfig = {
  apiKey: "AIzaSyB-HLjIoO4bqia8ndfXvMXkDMsd53Gx9Uk",
  authDomain: "pushnotificationrazzmatazz.firebaseapp.com",
  projectId: "pushnotificationrazzmatazz",
  storageBucket: "pushnotificationrazzmatazz.firebasestorage.app",
  messagingSenderId: "622773877166",
  appId: "1:622773877166:web:d3ef5154b6e6ad6c9ef03f",
  measurementId: "G-GTZYKTMC29"
};



const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFcmToken = async () => {
  try {
    const token = await getToken(messaging, {
       vapidKey:
        "BBQQmlldlGlgReCfvtivjs0mbbw0cU9wsDu44CCMISj9ddCBibfd8byKS8GfJsdDO5oicRUG5z_lO-i5JZHBsPU",
    });


    return token;
  } catch (err) {
    console.error("FCM token error:", err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📬 Foreground message:", payload);
      resolve(payload);
    });
  });

export { messaging };




// // src/firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyB3csmb87BiG1wvTXwbbkN2ZUfK9QH0-Vw",
//   authDomain: "razzmatazz-e9feb.firebaseapp.com",
//   projectId: "razmatazz-e9feb",
//   storageBucket: "razzmatazz-e9feb.firebasestorage.app",
//   messagingSenderId: "1011542027358",
//   appId: "1:1011542027358:web:e06b1e92611486f8e618cf",
//   measurementId: "G-RRMM68GQWM"
// };

// const app = initializeApp(firebaseConfig);

// // 🔥 FCM Messaging instance
// export const messaging = getMessaging(app);

