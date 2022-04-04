import dotenv from "dotenv"
import * as admin from "firebase-admin"
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore/lite";

dotenv.config()

const serviceAccount =require("../../serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ygm-control.firebaseapp.com",
  projectId: "ygm-control",
  storageBucket: "ygm-control.appspot.com",
  messagingSenderId: "387750336927",
  appId: process.env.FIREBASE_API_ID ,
  measurementId: process.env.FIREBASE_MEASUREAMENT_ID
};

initializeApp(firebaseConfig)


export class BaseInfrastructure {

  protected static firestore = getFirestore(initializeApp(firebaseConfig))

  protected static admin = admin

 }
 