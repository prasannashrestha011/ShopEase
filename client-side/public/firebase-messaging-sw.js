importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  
    apiKey: "AIzaSyDE49ZnbIz81Df1Crir9kdIVYe2CGMNhHc",
    authDomain: "shop-ease-384b7.firebaseapp.com",
    projectId: "shop-ease-384b7",
    storageBucket: "shop-ease-384b7.firebasestorage.app",
    messagingSenderId: "820534875652",
    appId: "1:820534875652:web:ef46523011d671000fc751",
    measurementId: "G-6DJBJTK872"

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