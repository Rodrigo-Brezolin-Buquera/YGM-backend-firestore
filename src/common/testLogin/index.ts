import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseConfig } from "../database/config"
import { initializeApp } from "firebase/app";
import { Request, Response } from "express";

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