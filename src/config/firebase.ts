import * as admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//teste
const firebaseConfig = {
  apiKey: "AIzaSyDFcy2h2lVirgDfDYB8kIPfGKtuhoXzFro",
  authDomain: "ygm-control.firebaseapp.com",
  projectId: "ygm-control",
  storageBucket: "ygm-control.appspot.com",
  messagingSenderId: "387750336927",
  appId: "1:387750336927:web:96f726ac4f93d0f0f645aa",
  measurementId: "G-TQ7K4MV6DY"
};

// produção
// const firebaseConfig = {
//   apiKey: "AIzaSyA_9kE2ZfP4Dck4fdf7-QT0BkBL9hDMDlE",
//   authDomain: "yoga-mangala.firebaseapp.com",
//   projectId: "yoga-mangala",
//   storageBucket: "yoga-mangala.appspot.com",
//   messagingSenderId: "137752975736",
//   appId: "1:137752975736:web:7883f748b0b2d400bdd08d",
//   measurementId: "G-NZXHKGKRKG"
// };

const serviceAccount = {
  type: "service_account",
  project_id: "ygm-control", //ygm-control para testes e yoga-mangala para produção
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY?.replace(/\\n/gm, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-a3scs%40ygm-control.iam.gserviceaccount.com",
};



const app = initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

export class BaseInfrastructure {
  protected static admin = admin;

  protected static firebaseAuth = getAuth(app);
}
