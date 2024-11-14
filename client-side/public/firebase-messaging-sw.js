importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTO_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID

});

const messaging=firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    
    // Customize notification here
    const notificationTitle = payload.notificationTitle;
    const notificationOptions = {
      body: payload.notification.body,
    
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });