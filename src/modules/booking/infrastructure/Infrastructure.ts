import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "../application/Repository";

import { BaseInfrastructure } from "../../../config/firebase";

import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';


export class BookingInfrastructure
  extends BaseInfrastructure
  implements BookingRepository
{
  
  protected static contractCollection = collection(BaseInfrastructure.firestore, "contracts")

  protected static yogaClassCollection = collection(BaseInfrastructure.firestore, "yogaClasses")
  
  public async createCheckin(): Promise<void> {
    try {

     
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
  public async validateCheckin(): Promise<void> {
    try {
      
     
    


    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteCheckin(): Promise<void> {
    try {
      
    
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
