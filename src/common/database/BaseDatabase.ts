import * as admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { NotFound } from "../customError/notFound";
import { firebaseConfig, serviceAccount } from "./config";


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});


export abstract class BaseDatabase {

  protected static firestore = admin.firestore();

  protected static adminAuth = admin.auth();

  protected static firebaseAuth = getAuth(initializeApp(firebaseConfig));

  abstract collectionName: string

  protected collection() {
    return BaseDatabase.firestore.collection(this.collectionName);
  }

  protected async findAll(): Promise<any>  {
    const snap = await this.collection().get();
    return snap.docs.map((doc) => doc.data());
  }

  protected async findById(id:string)  {
    const snap = await this.collection().doc(id).get()
    return snap ? snap.data() : undefined
  }

  protected async create(obj: any, toModel: any): Promise<void> {
    await this.collection().doc(obj.getId()).set(toModel(obj));
  }

  protected async edit(obj: any, toModel: any): Promise<void> {
    const snap = this.collection().doc(obj.getId())
    if (!snap) {
      throw new NotFound()
    } 
    await snap.update(toModel(obj));
  }

  public async delete(id: string): Promise<void> {
    const snap = this.collection().doc(id)
    if (snap) {
      await snap.delete();
    } else {
      throw new NotFound()
    }
  }
}
