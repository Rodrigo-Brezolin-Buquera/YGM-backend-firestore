//teste
export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "ygm-testes.firebaseapp.com",
  projectId: "ygm-testes",
  storageBucket: "ygm-testes.appspot.com",
  messagingSenderId: "90465665261",
  appId: "1:90465665261:web:91ef7effec5852cb9b8ce4"
};
  
  // produção
  // const firebaseConfig = {
  //   apiKey: process.env.API_KEY,
  //   authDomain: "yoga-mangala.firebaseapp.com",
  //   projectId: "yoga-mangala",
  //   storageBucket: "yoga-mangala.appspot.com",
  //   messagingSenderId: "137752975736",
  //   appId: "1:137752975736:web:f53b956eb890ea75bdd08d",
  //   measurementId: "G-Z426SP43BL"
  // };
  
  
  export const serviceAccount = {
    type: "service_account",
    project_id: "ygm-testes",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    client_email: "firebase-adminsdk-sw5pf@ygm-testes.iam.gserviceaccount.com",
    client_id: "117287425276469133313",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sw5pf%40ygm-testes.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  };

 
  