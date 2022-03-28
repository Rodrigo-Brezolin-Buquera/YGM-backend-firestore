import { CustomError } from "../../../common/customError/customError";
import { CalendarRepository } from "../application/Repository";
// import { } from "../domain/Domain";
import { BaseInfrastructure } from "../../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';


export class CalendarInfrastructure extends BaseInfrastructure implements CalendarRepository
{
  
  protected static classesCollection = collection(BaseInfrastructure.firestore, "yogaClasses")

  
  public async findAllClasses(): Promise<void> {
    try {

     
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
  public async createClass(): Promise<void> {
    try {
      
     

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async editClass(): Promise<void> {
    try {
      
   

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteClass(): Promise<void> {
    try {
      
   

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
