import { CustomError } from "../../../common/customError/customError";
import { CalendarRepository } from "../application/Repository";
// import { } from "../domain/Domain";
import { BaseInfrastructure } from "../../../config/firebase";

import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc, runTransaction } from 'firebase/firestore/lite';
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
  public async createClass(yogaClass:YogaClass): Promise<void> {
    try {
        const newYogaClass = {
            name: yogaClass.name,
            date: yogaClass.date,
            day: yogaClass.day,
            time: yogaClass.time,
            teacher: yogaClass.teacher,
            checkins: yogaClass.checkins,
            groupId: yogaClass.groupId,
            id: yogaClass.id
          };
        
          const yogaClasseDoc = doc(CalendarInfrastructure.classesCollection, yogaClass.id);
          await setDoc(yogaClasseDoc, newYogaClass);


    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async editClass(yogaClasses: YogaClass[]): Promise<void> {
    try {
      console.log("array na infrastructure", yogaClasses)

      // implementar mudanças

     // await runTransaction(BaseInfrastructure.firestore, async (transaction) => {


        // const sfDoc = await transaction.get(sfDocRef);
        // if (!sfDoc.exists()) {
        //   throw "Document does not exist!";
        // }
    
        // const newPopulation = sfDoc.data().population + 1;
        // transaction.update(sfDocRef, { population: newPopulation 
     // });
      
   

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
    const result = new YogaClass(obj.name, obj.date, obj.day, obj.teacher, obj.time, obj.groupId, obj.checkins, obj.id)
    return result
}
}
