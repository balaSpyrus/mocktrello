// Import the functions you need from the SDKs you need
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { DashBoardDataType } from './types';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBQQ8PxMCDJQFvwFKRKwnOEGGkOcTyr4Y0',
  authDomain: 'trello-db-ca4b5.firebaseapp.com',
  projectId: 'trello-db-ca4b5',
  storageBucket: 'trello-db-ca4b5.appspot.com',
  messagingSenderId: '470835219425',
  appId: '1:470835219425:web:ab9f2abc79a923d79420a0',
  measurementId: 'G-GPQB01DV77',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const COLLECTION_NAME = 'trello_board';
const collectionRef = collection(db, COLLECTION_NAME);

export const updateDashboard = async (id: string, newData: DashBoardDataType) => {
  const userDoc = doc(db, COLLECTION_NAME, id);
  await updateDoc(userDoc, newData as Record<string, any>);
};

export const deleteDashboard = async (id: string) => {
  const userDoc = doc(db, COLLECTION_NAME, id);
  await deleteDoc(userDoc);
};

export const createDashboard = async (newData: DashBoardDataType) =>
  await addDoc(collectionRef, newData);

export const insertMockData = async (): Promise<DashBoardDataType[]> => {
  const mockData: DashBoardDataType[] = await fetch(
    `${process.env.PUBLIC_URL}/mock-data.json`,
  ).then((data) => data.json());
  Promise.all(mockData.map(async (data) => await createDashboard(data)));
  return getAllDashboards();
};

export const getAllDashboards = async (useMock = false) => {
  const data = await getDocs(collectionRef);
  if (data.empty && useMock) {
    return insertMockData();
  } else {
    return data.docs.map((each) => ({ ...each.data(), id: each.id } as DashBoardDataType));
  }
};
