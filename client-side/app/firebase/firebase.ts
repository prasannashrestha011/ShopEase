
import {initializeApp} from 'firebase/app'
import {getMessaging} from 'firebase/messaging'
const firebaseConfig = {
    apiKey: "AIzaSyDE49ZnbIz81Df1Crir9kdIVYe2CGMNhHc",
    authDomain: "shop-ease-384b7.firebaseapp.com",
    projectId: "shop-ease-384b7",
    storageBucket: "shop-ease-384b7.firebasestorage.app",
    messagingSenderId: "820534875652",
    appId: "1:820534875652:web:ef46523011d671000fc751",
    measurementId: "G-6DJBJTK872"
  };
const app=initializeApp(firebaseConfig)
export const messaging=getMessaging(app)