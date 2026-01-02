// import React, { useEffect } from "react";
// import { messaging } from "./firebaseConfig";
// import { getToken, onMessage } from "firebase/messaging";

// export default function GetFcmToken() {
//   useEffect(() => {
//     requestPermission();
//     listenForMessages();
//   }, []);

//   const requestPermission = async () => {
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission === "granted") {
//         console.log("✅ Notification permission granted.");

//         // Replace this with your real VAPID key from Firebase Console → Cloud Messaging → Web Push Certificates
//         const vapidKey = "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//         const token = await getToken(messaging, { vapidKey });
//         if (token) {
//           console.log("📱 FCM Token:", token);
//         } else {
//           console.log("❌ No registration token available.");
//         }
//       } else {
//         console.log("❌ Notification permission denied.");
//       }
//     } catch (error) {
//       console.error("🔥 Error getting FCM token:", error);
//     }
//   };

//   const listenForMessages = () => {
//     onMessage(messaging, (payload) => {
//       console.log("📬 Message received:", payload);
//       alert(`${payload.notification.title}: ${payload.notification.body}`);
//     });
//   };

//   return <h2>Firebase Cloud Messaging Ready ✅</h2>;
// }

// import React, { useEffect } from "react";
// import { messaging } from "./firebaseConfig";
// import { getToken, onMessage } from "firebase/messaging";

// export default function GetFcmToken() {
//   useEffect(() => {
//     requestPermission();
//     listenForMessages();
//   }, []);

//   const requestPermission = async () => {
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission === "granted") {
//         console.log("✅ Notification permission granted.");

//         const vapidKey =
//           "BK9m8LEO5fnNFPGwdee7i1cZQTUEQXyLrOufdzFZum3_JanwQoIstecg1hag8hjtOFL1G3rDfEhgsTtJjtmFWJo";

//         const token = await getToken(messaging, { vapidKey });

//         if (token) {
//           console.log("📱 FCM Token:", token);

//           // ✅ Save token in localStorage for register/login API
//           localStorage.setItem("fcmToken", token);

//         } else {
//           console.log("❌ No registration token available.");
//         }
//       } else {
//         console.log("❌ Notification permission denied.");
//       }
//     } catch (error) {
//       console.error("🔥 Error getting FCM token:", error);
//     }
//   };

//   const listenForMessages = () => {
//     onMessage(messaging, (payload) => {
//       console.log("📬 Message received:", payload);
//       alert(`${payload.notification.title}: ${payload.notification.body}`);
//     });
//   };

//   return <h2>Firebase Cloud Messaging Ready ✅</h2>;
// }

// import React, { useEffect } from "react";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "./firebaseConfig";

// export default function GetFcmToken() {
//   useEffect(() => {
//     listenForMessages();
//   }, []);

//   const listenForMessages = () => {
//     onMessage(messaging, (payload) => {
//       console.log("📬 Message received:", payload);
//       alert(`${payload.notification.title}: ${payload.notification.body}`);
//     });
//   };

//   return null;
// }

// import { useEffect } from "react";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "./firebaseConfig";

// export default function GetFcmToken() {
//   useEffect(() => {
//     onMessage(messaging, (payload) => {
//       console.log("📬 Foreground message:", payload);
//       alert(`${payload.notification.title}\n${payload.notification.body}`);
//     });
//   }, []);

//   return null;
// }

// import { useEffect } from "react";
// import { requestFcmToken, onMessageListener } from "./firebaseConfig";
// import ApiService from "../Services/Apiservice";

// export default function GetFcmToken({ userId }) {
//   useEffect(() => {
//     const init = async () => {
//       Notification.requestPermission().then(async (permission) => {
//         if (permission === "granted") {
//           const token = await requestFcmToken();
//           console.log("🔥 FCM Token:", token);

//           if (token && userId) {
//             await ApiService.post("save-fcm-token", { userId, token });
//           }
//         }
//       });
//     };

//     init();

//     // LISTEN to foreground messages
//     onMessageListener().then((payload) => {
//       alert(`${payload.notification.title}\n${payload.notification.body}`);
//     });
//   }, []);

//   return null;
// }

// import { useEffect } from "react";
// import { getToken, onMessage } from "firebase/messaging";
// import { messaging } from "./firebaseConfig";

// export default function GetFcmToken() {
//   useEffect(() => {
//     console.log("📌 GetFcmToken Loaded");

//     // STEP 1: Ask permission
//     Notification.requestPermission().then(async (permission) => {
//       console.log("🔔 Notification Permission:", permission);

//       if (permission === "granted") {
//         try {
//           // STEP 2: Generate FCM Token
//           const token = await getToken(messaging, {
//             vapidKey: "BK9m8LEO5fnNFPGwzLR2DLeZVHQx0RIN-Bt6xuVy2S1Us1mD0e-PwYSHqQju27OxGibH0tql8y9AbgWL3xqv3JE"
//           });

//           if (token) {
//             console.log("🔥 FCM Token:", token);
//             localStorage.setItem("fcm_token", token);
//           } else {
//             console.warn("⚠️ No token returned. Check service worker or permissions.");
//           }
//         } catch (error) {
//           console.error("❌ Error getting token:", error);
//         }
//       }
//     });

//     // STEP 3: Foreground notifications
//     onMessage(messaging, (payload) => {
//       console.log("📬 Foreground Message:", payload);

//       new Notification(payload.notification.title, {
//         body: payload.notification.body,
//         icon: "/firebase-logo.png"
//       });
//     });

//   }, []);

//   return null;
// }

// import { useEffect } from "react";
// import { getToken, onMessage } from "firebase/messaging";
// import { messaging } from "./firebaseConfig";

// export default function GetFcmToken() {
//   useEffect(() => {
//     const requestPermissionAndToken = async () => {
//       console.log("🔄 Requesting Notification Permission...");

//       const permission = await Notification.requestPermission();
//       console.log("📌 Permission:", permission);

//       if (permission !== "granted") {
//         console.warn("❌ Notification permission not granted");
//         return;
//       }

//       try {
//         const vapidKey = "BLoCrkSlGVLc0e3Q-QZqvByyFyEIZ9JQEQcZyAiOLkwVEXm7m_RxNzzSAsUmnvozhuOs69mvVoJPqvlr8dNUdMM";

//         const token = await getToken(messaging, { vapidKey });

//         if (token) {
//           console.log("🔥 FCM Token:", token);
//           localStorage.setItem("fcmToken", token);
//         } else {
//           console.log("⚠️ No token received");
//         }
//       } catch (err) {
//         console.error("❌ Error getting FCM token:", err);
//       }
//     };

//     requestPermissionAndToken();

//     // Listen for foreground messages
//     onMessage(messaging, (payload) => {
//       console.log("📬 Foreground message:", payload);
//       alert(`${payload.notification.title}\n${payload.notification.body}`);
//     });
//   }, []);

//   return null;
// }

import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebaseConfig";

export default function GetFcmToken() {
  useEffect(() => {
    const initFCM = async () => {
      try {
        console.log("🔄 Registering Service Worker...");

        // 1️⃣ Register service worker
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("✅ Service Worker Registered:", registration);

        // 2️⃣ Ask notification permission
        const permission = await Notification.requestPermission();
        console.log("📌 Permission:", permission);

        if (permission !== "granted") {
          console.warn("❌ Notification permission denied by user");
          return;
        }

        // 3️⃣ Get FCM Token
        console.log("🔄 Getting FCM Token...");
        const token = await getToken(messaging, {
          vapidKey:
            "BBQQmlldlGlgReCfvtivjs0mbbw0cU9wsDu44CCMISj9ddCBibfd8byKS8GfJsdDO5oicRUG5z_lO-i5JZHBsPU",

          serviceWorkerRegistration: registration, // ✔ REQUIRED
        });

        if (token) {
          console.log("🔥 FCM Token Generated:", token);
          localStorage.setItem("fcmToken", token);
        } else {
          console.log("⚠️ No FCM token received");
        }
      } catch (error) {
        console.error("❌ Error initializing FCM:", error);
      }
    };

    initFCM();

    // 4️⃣ Receive foreground messages
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground Notification:", payload);

      if (payload?.notification) {
        alert(`${payload.notification.title}\n${payload.notification.body}`);
      }
    });
  }, []);

  return null;
}

// import { getToken } from "firebase/messaging";
// import { messaging } from "./firebaseConfig";

// export const getFcmToken = async () => {
//   try {
//     const permission = await Notification.requestPermission();

//     if (permission !== "granted") {
//       console.log("⛔ Notification permission denied");
//       return null;
//     }

//     const token = await getToken(messaging, {
//       vapidKey:
//         "BLoCrkSlGVLc0e3Q-QZqvByyFyEIZ9JQEQcZyAiOLkwVEXm7m_RxNzzSAsUmnvozhuOs69mvVoJPqvlr8dNUdMM",
//     });

//     if (token) {
//       console.log("🔥 FCM Token:", token);
//       return token;
//     } else {
//       console.log("No FCM token received");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//     return null;
//   }
// };
