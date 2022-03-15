import axios from "axios";
import { signupDTO } from "../../modules/auth/domain/Types";
import { PLAN } from "../../modules/contracts/domain/Types";
import { Plan } from "../../modules/plans/domain/Domain";
import { CustomError } from "../customError/customError";

export const baseURL = "http://localhost:3003"

export const requestPlanInfo = async (plan:PLAN): Promise<Plan> => {
    try{
        const planURL: string = `${baseURL}/plans/list`;
        const response = await axios.get(planURL)
        const plansList = response.data  
        return plansList.find((item)=> item.id == plan )
    } catch(error){
        throw new CustomError( error.message,    error.statusCode || 400 ) 
    }
}

export const requestSignup = async ({ id, name, email }:signupDTO): Promise<void> => {
    try{
        const signupURL: string = `${baseURL}/auth/signup`;
        await axios.post(signupURL, { id, name, email });
    } catch(error){
        throw new CustomError( error.message,  error.statusCode || 400 ) 
    }
}

export const requestDeleteContract = async (id:string): Promise<void> => {
    try{
        const authURL: string = `${baseURL}/auth/${id}`;
        await axios.delete(authURL)
  
    } catch(error){
        throw new CustomError( error.message,  error.statusCode || 400 ) 
    }
}
