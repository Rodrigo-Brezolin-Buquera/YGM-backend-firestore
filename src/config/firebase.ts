import * as admin from "firebase-admin"

const serviceAccount =require("../../serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})


export class BaseInfrastructure {

  protected static admin = admin

 }
 