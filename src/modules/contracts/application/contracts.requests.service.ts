import axios from "axios";
import { PLAN } from "../domain/contracts.Types";
import { Plan } from "../domain/contracts.Types";
import { CustomError } from "../../../common/customError/customError";
import { RequestUserDTO } from "../domain/contracts.DTO";
import { baseURL } from "../../../common/constants/baseURL";



export const requestPlanInfo = async (plan: PLAN): Promise<Plan> => {
    try{
        const planURL: string = `${baseURL}/plans/list`;
        const response = await axios.get(planURL)
        const plansList = response.data  
        return plansList.find((item: Plan)=> item.id == plan )
    } catch(error:any){
        throw new CustomError(error.message,    error.statusCode || 400 ) 
    }
}

export const requestCreateUser = async ({ id, name, email, token }: RequestUserDTO): Promise<void> => {
    try{
        const signupURL: string = `${baseURL}/auth/createUser`;
        await axios.post(signupURL, {id, name, email, token } );
    } catch(error:any){
        throw new CustomError( error.message,  error.statusCode || 400 ) 
    }
}

export const requestDeleteUser = async (id:string, token: string): Promise<void> => {
    try{
        const authURL: string = `${baseURL}/auth/${id}/${token}`;
        await axios.delete(authURL)
  
    } catch(error:any){
        throw new CustomError( error.message,  error.statusCode || 400 ) 
    }
}
