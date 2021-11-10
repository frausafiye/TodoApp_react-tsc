"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getSingleDocument = exports.getDocumentsFromCollection = exports.saveDocument = void 0;
const firestore_1 = require("firebase/firestore");
const app_1 = require("./app");
const saveDocument = async function (collectionName, obj) {
    try {
        console.log(obj);
        const docRef = await firestore_1.addDoc(firestore_1.collection(app_1.db, collectionName), { ...obj });
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
        const querySnapshot = await firestore_1.getDocs(firestore_1.collection(app_1.db, collectionName));
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
        const docRef = firestore_1.doc(app_1.db, collectionName, obj.id);
        const docSnap = await firestore_1.getDoc(docRef);
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
        const docRef = firestore_1.doc(app_1.db, collectionName, id);
        await firestore_1.updateDoc(docRef, {
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
            await firestore_1.deleteDoc(firestore_1.doc(app_1.db, collectionName, document.data.id));
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
