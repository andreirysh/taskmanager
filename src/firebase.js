import 'firebase/database';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDqRDX4XJwex_AtOoAno33ipmawoh35dZo",
  authDomain: "taskmanager-c31dd.firebaseapp.com",
  projectId: "taskmanager-c31dd",
  storageBucket: "taskmanager-c31dd.appspot.com",
  messagingSenderId: "24816563990",
  appId: "1:24816563990:web:ff683421badb533be80237",
  measurementId: "G-4017QVT908",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const db = getFirestore(app)

export const storage = getStorage(app)
