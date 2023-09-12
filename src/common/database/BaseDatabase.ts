import * as admin from "firebase-admin";
import  dotenv  from "dotenv";
import { NotFound } from "../customError/notFound";
import { serviceAccount } from "./config";

dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as object),
});


export abstract class BaseDatabase {

  protected static firestore = admin.firestore();

  protected static auth = admin.auth();


  abstract collectionName: string

  protected collection() {
    return BaseDatabase.firestore.collection(this.collectionName);
  }

  protected async findAll(): Promise<any[]>  {
    const snap = await this.collection().get();
    return snap.docs.map((doc) => doc.data());
  }

  protected async findById(id:string): Promise<any | undefined>  {
    const snap = await this.collection().doc(id).get()
    return snap ? snap.data() : undefined
  }

  protected async create(obj: any, toModel: any): Promise<void> {
    await this.collection().doc(obj.getId()).set(toModel(obj));
  }

  protected async edit(obj: any, toModel: any): Promise<void> {
    const snap = await this.collection().doc(obj.getId()).get()
    if (!snap.exists) {
      throw new NotFound()
    } 
    await snap.ref.update(toModel(obj));
  }

  protected async delete(id: string): Promise<void> {
    const snap = await this.collection().doc(id).get()
    if (snap.exists) {
      await snap.ref.delete();
    } else {
      throw new NotFound() 
    }
  }
}
