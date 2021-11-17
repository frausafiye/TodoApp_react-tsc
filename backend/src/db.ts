import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./app";
export const saveDocument = async function (
  collectionName: string,
  obj: Object
) {
  try {
    const docRef = await addDoc(collection(db, collectionName), { ...obj });
    return { success: true, data: { id: docRef.id, ...obj } };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getDocumentsFromCollection = async function (
  collectionName: string,
  id: string
) {
  try {
    const q = query(collection(db, collectionName), where("userID", "==", id));
    const querySnapshot = await getDocs(q);
    const tempDoc = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return { success: true, data: tempDoc };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getSingleDocument = async function (
  collectionName: string,
  obj: { id: string }
) {
  try {
    const docRef = doc(db, collectionName, obj.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      const error = new Error("No such document!");
      return { success: false, error: error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};

export const updateDocument = async function (
  collectionName: string,
  obj: {
    id: string;
  }
) {
  try {
    const { id, ...newObj } = obj;
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...newObj,
    });
    return { success: true, data: obj };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const deleteDocument = async function (
  collectionName: string,
  obj: { id: string }
) {
  try {
    const document = await getSingleDocument(collectionName, obj);
    const documentData = document.data;
    if (document.success) {
      await deleteDoc(doc(db, collectionName, document.data!.id));
      return { success: true, data: documentData };
    } else {
      const error = new Error("no document found");
      return { success: false, error: error };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};
