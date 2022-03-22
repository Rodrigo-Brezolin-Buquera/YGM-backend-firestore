import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/Repository";
import { Auth } from "../domain/Domain";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { BaseInfrastructure } from "../../../config/firebase";
import * as functions from "firebase-functions"
const { getFirestore } = require('firebase-admin/firestore');

export class AuthInfrastructure
  extends BaseInfrastructure
  implements AuthRepository
{

  protected static userCollection = collection(
    BaseInfrastructure.firestore,
    "users"
  );

  public async login(auth: Auth): Promise<string> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        auth.email,
        auth.password
      );

      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
         
          const uid = user.uid;
          // pegar dados desse usuário pela requisição
        
        } else {
          throw new CustomError("Usuário não está logado", 406)
        } 
      })

        // erro quando não estiver logado

      const token = userCredential.user.getIdToken();

        // um outro token que tenha o id, o role e tempo de duração (pro front??)

      return token;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
  public async createUser(auth: Auth): Promise<void> {
    try {
      // necessario verificar auth de admin para criar. ele cria user sem verificar
     await AuthInfrastructure.admin.auth().createUser({
          uid: auth.id,
          email: auth.email,
          password: auth.password
  
        })
        
        const newUser = {
            admin: false,
               email: auth.email,
               name: auth.name,
               contractId: auth.id,
             };

             const db = getFirestore();
            
             await db.collection("users").doc(auth.id).set(newUser)
           
            //  await docRef.set(newUser)

       // await AuthInfrastructure.admin.collection(AuthInfrastructure.userCollection).doc(auth.id).set(newUser)


        // fireStore simples
        // const docRef = doc(AuthInfrastructure.userCollection, auth.id)
        // const newUser = {
        //   admin: false,
        //      email: auth.email,
        //      name: auth.name,
        //      contractId: auth.id,
        //    };
        //      await setDoc(docRef, newUser)


        // cloud funcition???
        // exports.createProfile = functions.auth.user().onCreate((user) => {

        //   const newUser = {
        //     admin: false,
        //     email: auth.email,
        //     name: auth.name,
        //     contractId: auth.id,
        //   };
      
        //   return AuthInfrastructure.admin.firestore().doc('users/'+user.uid).set(newUser);
        // })

    // console.log("usuário criado no auth")    
    // const userDoc = doc( AuthInfrastructure.userCollection, auth.id );
    // console.log("docRef criado no auth")    
    //   

    //   // o erro está aqui no setDoc - ele retorna proibido - ele entende que loguei com o outro usuário??
    //  await setDoc(userDoc, newUser);

   
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {

      // deletar pelo admin também


      const userDoc = doc(AuthInfrastructure.userCollection, id);
      const docSnap = await getDoc(userDoc)
      
      if(docSnap.exists()){
          await deleteDoc(userDoc)
      } else {
          throw CustomError.userNotFound()
      }          
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
  
  

}
