
import {initializeApp} from 'firebase/app'
import {getMessaging} from 'firebase/messaging'
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTO_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID

};
const app=initializeApp(firebaseConfig)
export const messaging=getMessaging(app)