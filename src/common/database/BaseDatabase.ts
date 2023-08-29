import * as admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig, serviceAccount } from "./config";


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});


export abstract class BaseDatabase {
  protected static admin = admin;

  protected static firebaseAuth = getAuth(initializeApp(firebaseConfig));

}
