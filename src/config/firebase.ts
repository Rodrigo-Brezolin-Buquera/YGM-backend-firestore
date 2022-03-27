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
  apiKey: "AIzaSyDFcy2h2lVirgDfDYB8kIPfGKtuhoXzFro",
  authDomain: "ygm-control.firebaseapp.com",
  projectId: "ygm-control",
  storageBucket: "ygm-control.appspot.com",
  messagingSenderId: "387750336927",
  appId: "1:387750336927:web:8933513bdb4fd0f0f645aa",
  measurementId: "G-X0D2W9CFRW"
};

initializeApp(firebaseConfig)


export class BaseInfrastructure {

  protected static firestore = getFirestore(initializeApp(firebaseConfig))

  protected static admin = admin

 }
 