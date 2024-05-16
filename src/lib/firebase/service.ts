import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  result: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", result)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false);
    });
}

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveDataByUser(collectionName: string, email: string) {
  const q = query(collection(firestore, collectionName), where("user.email", "==", email));
  const querySnapshot = await getDocs(q);
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    // Ambil ID dokumen
    const docData = doc.data();
    const id = doc.id;
    // Masukkan ID ke dalam data
    data.push({ ...docData, id });
  });
  return data;
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function uploadFile(
  id: string,
  file: any,
  newName: string,
  collection: string,
  callback: Function
) {
  if (file) {
    if (file.size < 1000000) {
      const storageRef = ref(storage, `images/${collection}/${id}/${newName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            callback(true, downloadURL);
          });
        }
      );
    } else {
      return callback(false);
    }
  }
  return true;
}

export async function deleteFile(url: string, callback: Function) {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef)
    .then(() => {
      return callback(true);
    })
    .catch(() => {
      return callback(false);
    });
}
