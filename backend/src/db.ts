// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClwiiK8_WINLb7wjn7ld03UcNmLh5b1xc",
  authDomain: "deft-effect-295213.firebaseapp.com",
  projectId: "deft-effect-295213",
  storageBucket: "deft-effect-295213.appspot.com",
  messagingSenderId: "943567395085",
  appId: "1:943567395085:web:8e13067bc411a65262b844",
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();

export const saveDocument = async function (
  collectionName: string,
  obj: Object
) {
  try {
    console.log(obj);
    const docRef = await addDoc(collection(db, collectionName), { ...obj });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, data: { id: docRef.id, ...obj } };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getDocumentsFromCollection = async function (
  collectionName: string
) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const tempDoc = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log(tempDoc);
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
    console.log(obj);
    console.log(newObj);
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
    console.log(collectionName, obj);
    const document = await getSingleDocument(collectionName, obj);
    if (document.success) {
      await deleteDoc(doc(db, collectionName, document.data!.id));
      return { success: true, data: document.data };
    } else {
      const error = new Error("no document found");
      return { success: false, error: error };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

//call the functions like below:
//saveDocument("user", new User("Jhon", "NY"));
