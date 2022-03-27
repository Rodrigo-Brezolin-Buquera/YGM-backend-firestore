import dotenv from "dotenv"
import * as admin from "firebase-admin"

dotenv.config()

const serviceAccount =require("../../serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export class BaseInfrastructure {

  protected static firestore = admin.firestore()

  protected static admin = admin
 }
 