import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { app } from "./auth";

const db = getFirestore(app);

/* =========================================================
   📥 전체 종목 가져오기
   ========================================================= */

export const getStocksFromDB = async () => {
  const snapshot = await getDocs(collection(db, "stocks"));

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

/* =========================================================
   ➕ 종목 추가
   ========================================================= */

export const addStockToDB = async (data) => {
  await addDoc(collection(db, "stocks"), data);
};

/* =========================================================
   ✏️ 수정 (StockApp.jsx 요구)
   ========================================================= */

export const updateStockInDB = async (id, data) => {
  const ref = doc(db, "stocks", id);
  await updateDoc(ref, data);
};

/* =========================================================
   🗑 삭제 (StockApp.jsx 요구)
   ========================================================= */

export const deleteStockFromDB = async (id) => {
  await deleteDoc(doc(db, "stocks", id));
};

/* =========================================================
   📤 export
   ========================================================= */

export { db };