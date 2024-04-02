"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getSingleDocument = exports.getDocumentsFromCollection = exports.saveDocument = void 0;
const firestore_1 = require("firebase/firestore");
const app_1 = require("./app");
const saveDocument = async function (collectionName, obj) {
    try {
        const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(app_1.db, collectionName), { ...obj });
        return { success: true, data: { id: docRef.id, ...obj } };
    }
    catch (error) {
        return { success: false, error: error };
    }
};
exports.saveDocument = saveDocument;
const getDocumentsFromCollection = async function (collectionName, id) {
    try {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(app_1.db, collectionName), (0, firestore_1.where)("userID", "==", id));
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        return { success: true, data: tempDoc };
    }
    catch (error) {
        return { success: false, error: error };
    }
};
exports.getDocumentsFromCollection = getDocumentsFromCollection;
const getSingleDocument = async function (collectionName, obj) {
    try {
        const docRef = (0, firestore_1.doc)(app_1.db, collectionName, obj.id);
        const docSnap = await (0, firestore_1.getDoc)(docRef);
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
        const docRef = (0, firestore_1.doc)(app_1.db, collectionName, id);
        await (0, firestore_1.updateDoc)(docRef, {
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
        const document = await (0, exports.getSingleDocument)(collectionName, obj);
        const documentData = document.data;
        if (document.success) {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(app_1.db, collectionName, document.data.id));
            return { success: true, data: documentData };
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
