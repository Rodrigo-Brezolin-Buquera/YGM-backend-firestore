import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/Repository";
import { Auth } from "../domain/Domain";
import { BaseInfrastructure } from "../../../config/firebase";



export class AuthInfrastructure
  extends BaseInfrastructure
  implements AuthRepository
{
  

  protected static userCollection = BaseInfrastructure.firestore.collection("users")
  
  

  public async login(auth: Auth): Promise<string> {
    try {


      // const userCredential = await signInWithEmailAndPassword(
      //   getAuth(),
      //   auth.email,
      //   auth.password
      // );

      // onAuthStateChanged(getAuth(), (user) => {
      //   if (user) {
      //     const uid = user.uid;
      //     // pegar dados desse usuário pela requisição
      //   } else {
      //     throw new CustomError("Usuário não está logado", 406);
      //   }
      // });

      // // erro quando não estiver logado

      // const token = userCredential.user.getIdToken();

      // // um outro token que tenha o id, o role e tempo de duração (pro front??)

      return "token";
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
  public async createUser(auth: Auth): Promise<void> {
    try {
      
      const newUser = {
        admin: false,
        email: auth.email,
        name: auth.name,
        contractId: auth.id,
      };

      
    
      await AuthInfrastructure.userCollection.doc(auth.id).set(newUser);

     
      // ter o usuario aqui faz sentido? 
      await AuthInfrastructure.admin.auth().createUser({
        uid: auth.id,
        email: auth.email,
        password: auth.password,
      });

     

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      
      const userDoc = await AuthInfrastructure.userCollection.doc(id).get()

      if (userDoc.exists) {
        await await AuthInfrastructure.userCollection.doc(id).delete()
      } else {
        throw CustomError.userNotFound();
      }
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
