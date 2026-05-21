import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOGhBm9w6sK9-1nTiQ4wxmXdMxb341XTE',
  authDomain: 'atividade-bimestral-aec9d.firebaseapp.com',
  projectId: 'atividade-bimestral-aec9d',
  storageBucket: 'atividade-bimestral-aec9d.firebasestorage.app',
  messagingSenderId: '660992691285',
  appId: '1:660992691285:web:0fdf4122101c99999018dc',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export default app;
