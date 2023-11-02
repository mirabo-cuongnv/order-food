import {
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDoc,
  collection,
  serverTimestamp,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

export const addDocument = async (collection, data, dbName) => {
  await setDoc(doc(db, dbName, collection), { ...data, createdAt: serverTimestamp() });
};

export const addDocumentAutoID = async (data, dbName) => {
  await addDoc(collection(db, dbName), { ...data, createdAt: serverTimestamp() });
};

export const updateDocment = async (collection, data, dbName) => {
  await updateDoc(doc(db, dbName, collection), { ...data, updatedAt: serverTimestamp() });
};

export const getDocment = async (collection, dbName) => {
  const docSnap = await getDoc(doc(db, dbName, collection));

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return [];
  }
};

export const getDocments = async () => {};

export const getDocmentWithQuery = async (query) => {
  const unsubscribe = onSnapshot(query, (querySnapshot) => {
    const datas = [];
    querySnapshot.forEach((doc) => {
      datas.push(doc.data());
    });
    console.log('Current cities in CA: ', datas.join(', '));
  });
};

export const uploadStorage = (collection, file) => {
  const storageRef = ref(storage, collection);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!', snapshot);
  });
};

export const downloadStorage = (collection) => {
  const storageRef = ref(storage, collection);
  return getDownloadURL(storageRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      return url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
};
