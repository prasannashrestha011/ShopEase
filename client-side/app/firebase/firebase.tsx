
import {initializeApp} from 'firebase/app'
import {getMessaging, Messaging} from 'firebase/messaging'

import dotenv from 'dotenv';
  dotenv.config();


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTO_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};
let messaging:Messaging;
if (typeof window !== 'undefined') {  // Check if it's running on the client-side
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export { firebaseConfig,messaging };
