"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getSingleDocument = exports.getDocumentsFromCollection = exports.saveDocument = exports.db = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firestore_2 = require("firebase/firestore");
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
const firebase = app_1.initializeApp(firebaseConfig);
exports.db = firestore_1.getFirestore();
const saveDocument = async function (collectionName, obj) {
    try {
        console.log(obj);
        const docRef = await firestore_2.addDoc(firestore_2.collection(exports.db, collectionName), { ...obj });
        console.log("Document written with ID: ", docRef.id);
        return { success: true, data: { id: docRef.id, ...obj } };
    }
    catch (error) {
        return { success: false, error: error };
    }
};
exports.saveDocument = saveDocument;
const getDocumentsFromCollection = async function (collectionName) {
    try {
        const querySnapshot = await firestore_2.getDocs(firestore_2.collection(exports.db, collectionName));
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        console.log(tempDoc);
        return { success: true, data: tempDoc };
    }
    catch (error) {
        return { success: false, error: error };
    }
};
exports.getDocumentsFromCollection = getDocumentsFromCollection;
const getSingleDocument = async function (collectionName, obj) {
    try {
        const docRef = firestore_2.doc(exports.db, collectionName, obj.id);
        const docSnap = await firestore_2.getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
        }
        else {
            const error = new Error("No such document!");
            return { success: false, error: error };
        }
    }
    catch (error) {
        console.error(error);
        return { success: false, error: error };
    }
};
exports.getSingleDocument = getSingleDocument;
const updateDocument = async function (collectionName, obj) {
    try {
        const { id, ...newObj } = obj;
        console.log(obj);
        console.log(newObj);
        const docRef = firestore_2.doc(exports.db, collectionName, id);
        await firestore_2.updateDoc(docRef, {
            ...newObj,
        });
        return { success: true, data: obj };
    }
    catch (error) {
        return { success: false, error: error };
    }
};
exports.updateDocument = updateDocument;
const deleteDocument = async function (collectionName, obj) {
    try {
        console.log(collectionName, obj);
        const document = await exports.getSingleDocument(collectionName, obj);
        if (document.success) {
            await firestore_2.deleteDoc(firestore_2.doc(exports.db, collectionName, document.data.id));
            return { success: true, data: document.data };
        }
        else {
            const error = new Error("no document found");
            return { success: false, error: error };
        }
    }
    catch (error) {
        return { success: false, error: error };
    }
};
exports.deleteDocument = deleteDocument;
//call the functions like below:
//saveDocument("user", new User("Jhon", "NY"));
