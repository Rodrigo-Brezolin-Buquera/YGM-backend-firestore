import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import dotenv from "dotenv"

const admin =require('firebase-admin') 
const serviceAccount =require("../../serviceAccountKey.json")
dotenv.config()

const firebaseConfig = {
  apiKey: "AIzaSyDFcy2h2lVirgDfDYB8kIPfGKtuhoXzFro",
  authDomain: "ygm-control.firebaseapp.com",
  projectId: "ygm-control",
  storageBucket: "ygm-control.appspot.com",
  messagingSenderId: "387750336927",
  appId: "1:387750336927:web:8933513bdb4fd0f0f645aa",
  measurementId: "G-X0D2W9CFRW"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})


export class BaseInfrastructure {

  protected static firestore = getFirestore(initializeApp(firebaseConfig))

  protected static admin = admin.firestore()
 }
 