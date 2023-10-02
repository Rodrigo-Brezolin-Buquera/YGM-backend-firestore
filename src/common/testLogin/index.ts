import { getAuth, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseConfig } from "../database/config"
import { initializeApp } from "firebase/app";
import { Request, Response } from "express";
import FirebaseTokenService from "../services/common.firebaseToken.service";

const auth = getAuth(initializeApp(firebaseConfig))

export const adminLogin = async (req: Request, res: Response)=> {
  const credential = await signInWithEmailAndPassword( auth,
    "admintest@email.com",
    "123456"
  )
  const token = await credential.user.getIdToken()
  res.send(token)
  
}


export const userLogin = async (req: Request, res: Response)=> {
  const credential = await signInWithEmailAndPassword( auth,
    "teste@email.com",
    "123456"
  )
  const token = await credential.user.getIdToken()
  res.send(token)
  
}

export const tokenTest = async (req: Request, res: Response)=> {
  const tokenServ = new FirebaseTokenService()
  const customToken = await tokenServ.generateToken({id: "fxsaFCfOkhUjIRK4XgW2gh6wbce2", admin: false })

  const userCredential = await signInWithCustomToken(auth, customToken)

  const token = await userCredential.user.getIdToken() // isso é muito importante no front!

   await tokenServ.verifyAdminPermission(token)
  res.send("fail")
  
}