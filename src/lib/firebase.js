
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* =========================================================
   🔥 Firebase 설정 (.env 기반)
   ========================================================= */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/* =========================================================
   🚨 env 검증 (이거 없으면 invalid-api-key 바로 뜸)
   ========================================================= */

const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

requiredKeys.forEach((key) => {
  if (!firebaseConfig[key]) {
    console.error(`🔥 Firebase env missing: ${key}`);
  }
});

/* =========================================================
   🚨 중복 초기화 방지 (핵심)
   ========================================================= */

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

/* =========================================================
   🔐 Auth / 📦 Firestore 인스턴스
   ========================================================= */

const auth = getAuth(app);
const db = getFirestore(app);

/* =========================================================
   📤 export
   ========================================================= */

export { app, auth, db };