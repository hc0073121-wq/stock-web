
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* =========================================================
   🔥 Firebase 설정 (.env 체크용)
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
   🔍 DEBUG (🔥 여기 정확히 넣는 위치)
   👉 Firebase 초기화 전에 무조건 확인
   ========================================================= */

console.log("🔥 FIREBASE CONFIG CHECK:", {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
});

/* =========================================================
   🚨 Firebase 초기화 (중복 방지)
   ========================================================= */

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

/* =========================================================
   👀 AUTH 상태 감지
   ========================================================= */

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user || null);
  });
};

/* =========================================================
   🔐 로그인
   ========================================================= */

export const login = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

/* =========================================================
   🆕 회원가입
   ========================================================= */

export const register = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

/* =========================================================
   🚪 로그아웃
   ========================================================= */

export const logout = async () => {
  await signOut(auth);
};

/* =========================================================
   📦 export
   ========================================================= */

export { auth, db };