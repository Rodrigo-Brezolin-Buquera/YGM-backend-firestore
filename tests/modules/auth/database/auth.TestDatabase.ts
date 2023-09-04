// import * as admin from "firebase-admin";
// import  dotenv  from "dotenv";
// import { initializeApp } from "firebase/app";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// import { firebaseConfig, serviceAccount } from "../../../../src/common/database/config";

// dotenv.config({ path: '.env.test' });


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as Object),
//   });

// export class AuthTestDatabase {

//     private collection = admin.firestore().collection("users");
//     private adminAuth = admin.auth();
  
//     private firebaseAuth = getAuth(initializeApp(firebaseConfig));
  
//     testUser = {
//       id: "id-testUser",
//       email: "testeUser@email.com",
//       password: "123456",
//       admin: false,
//       active: false,
//     };
    
//     public async createUser(): Promise<void> {
//       await createUserWithEmailAndPassword(
//         this.firebaseAuth,
//         this.testUser.email,
//         this.testUser.password
//       );
  
//       this.collection.doc(this.testUser.id).set(this.testUser);
//     }
  
//     public async deleteUser(): Promise<void> {
//       this.collection.doc(this.testUser.id).delete();
//       await this.adminAuth.deleteUser(this.testUser.id);
//     }
//   }