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
  public async signup(auth: Auth): Promise<void> {
    try {
      
      AuthInfrastructure.admin.auth().createUser({
        uid: "1",
        email: auth.email,
        password: auth.password

      })

      

      // const userCredential = await createUserWithEmailAndPassword(
      //   getAuth(),
      //   auth.email,
      //   auth.password
    //   // )
      
    //   const uid = userCredential.user.uid
   
    // const userDoc = doc( AuthInfrastructure.userCollection, uid );
      
    //   const newUser = {
    //     admin: false,
    //     email: auth.email,
    //     name: auth.name,
    //     contractId: uid,
    //   };

    //   // o erro está aqui no setDoc - ele retorna proibido - ele entende que loguei com o outro usuário??
    //   await setDoc(userDoc, newUser);

     
      console.log("setDoc feito")  

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
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
