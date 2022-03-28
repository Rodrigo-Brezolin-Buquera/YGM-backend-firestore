import { CustomError } from "../../../common/customError/customError";
import { CalendarRepository } from "../application/Repository";
// import { } from "../domain/Domain";
import { BaseInfrastructure } from "../../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { YogaClass } from "../domain/Domain";


export class CalendarInfrastructure extends BaseInfrastructure implements CalendarRepository
{
  
  protected static classesCollection = collection(BaseInfrastructure.firestore, "yogaClasses")

  
  public async findAllClasses(): Promise<YogaClass[]> {
    try {
        const yogaClassesSnaphot =  await getDocs(CalendarInfrastructure.classesCollection);
        const yogaClassesList = yogaClassesSnaphot.docs.map(doc => doc.data());
        const result = yogaClassesList.map((yogaClass)=> this.toModelYogaClass(yogaClass))
        return result
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

  public toModelYogaClass(obj: any): any {
    const result = new YogaClass(obj.name, obj.date, obj.day, obj.teacher, obj.time, obj.checkins, obj.groupId, obj.id)
    return result
}
}
