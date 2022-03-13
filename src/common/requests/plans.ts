import axios from "axios";
import { PLAN } from "../../modules/contracts/domain/Types";
import { Plan } from "../../modules/plans/domain/Domain";
import { CustomError } from "../customError/customError";
import { baseURL } from "./baseURL";

export const getPlanInfo = async (plan:PLAN): Promise<Plan> => {
    try{
        const planURL: string = `${baseURL}/plans/list`;
        const response = await axios.get(planURL)
        const plansList = response.data  
        return plansList.find((item)=> item.id === plan )
    } catch(error){
        throw new CustomError( error.message,    error.statusCode || 400 ) 
    }
}
