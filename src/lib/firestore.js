import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

/*
====================================
주식 추가
====================================
*/
export async function addStockToDB(data, uid) {
  try {
    await addDoc(collection(db, "stocks"), {
      ...data,
      uid,
      createdAt: Date.now(),
    });

    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/*
====================================
주식 조회
====================================
*/
export async function getStocksFromDB(uid) {
  try {
    const q = query(
      collection(db, "stocks"),
      where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, data };
  } catch (e) {
    return { success: false, error: e.message };
  }
}