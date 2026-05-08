import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/* =========================================================
   🔥 Firebase 설정
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
   🚨 Firebase 초기화 (중복 방지)
   ========================================================= */

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

/* =========================================================
   🔐 로그인 (LoginForm.jsx용)
   ========================================================= */

export const loginUser = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

/* =========================================================
   🆕 회원가입 (RegisterForm.jsx용)
   ========================================================= */

export const registerUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

/* =========================================================
   🚪 로그아웃
   ========================================================= */

export const logoutUser = async () => {
  await signOut(auth);
};

/* =========================================================
   👀 Auth 상태 감지
   ========================================================= */

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user || null);
  });
};

/* =========================================================
   📤 export
   ========================================================= */

export { app, auth };