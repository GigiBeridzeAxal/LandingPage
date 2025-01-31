import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBbHwY62JgXkmQUbs-9vsBeuc2vHCZ4LVU',
  authDomain: 'dream5-77a7e.firebaseapp.com',
  projectId: 'dream5-77a7e',
  storageBucket: 'dream5-77a7e.firebasestorage.app',
  messagingSenderId: '228654294969',
  appId: '1:228654294969:web:b8f8fd3a583ec1b433b868',
  measurementId: 'G-6YYQNK4CC0',
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
