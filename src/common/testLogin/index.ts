import { getAuth, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseConfig } from "../database/config"
import { initializeApp } from "firebase/app";
import { Request, Response } from "express";
import FirebaseTokenService from "../services/common.Token.service";

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
    "rodrigobbuquera@gmail.com",
    "123456"
  )
  const token = await credential.user.getIdToken()
  res.send(token)
  
}

