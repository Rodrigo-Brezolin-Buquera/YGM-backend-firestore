import { CustomError } from "../../../common/customError/customError";
import { CalendarRepository } from "../application/calendar.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  runTransaction,
} from "firebase/firestore/lite";
import { YogaClass } from "../domain/calendar.Entity";

export class CalendarInfrastructure
  extends BaseInfrastructure
  implements CalendarRepository
{
  protected static classesCollection = collection(
    BaseInfrastructure.firestore,
    "yogaClasses"
  );

  public async findAllClasses(): Promise<YogaClass[]> {
    try {
      const yogaClassesSnaphot = await getDocs(
        CalendarInfrastructure.classesCollection
      );
      const yogaClassesList = yogaClassesSnaphot.docs.map((doc) => doc.data());
      const result = yogaClassesList.map((yogaClass) =>
        this.toModelYogaClass(yogaClass)
      );
      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
  public async createClass(yogaClass: YogaClass): Promise<void> {
    try {
      const newYogaClass = {
        name: yogaClass.name,
        date: yogaClass.date,
        day: yogaClass.day,
        time: yogaClass.time,
        teacher: yogaClass.teacher,
        checkins: yogaClass.checkins,
        groupId: yogaClass.groupId,
        id: yogaClass.id,
      };

      const yogaClasseDoc = doc(
        CalendarInfrastructure.classesCollection,
        yogaClass.id
      );
      await setDoc(yogaClasseDoc, newYogaClass);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async editClass(yogaClasses: YogaClass[]): Promise<void> {
    try {
      await runTransaction(
        BaseInfrastructure.firestore,
        async (transaction) => {
          yogaClasses.forEach((yogaClass) => {
            const classDocRef = doc(
              CalendarInfrastructure.classesCollection,
              yogaClass.id
            );
            transaction.update(classDocRef, {
              name: yogaClass.name,
              teacher: yogaClass.teacher,
              time: yogaClass.time,
            });
          });
        }
      );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteClasses(yogaClasses: YogaClass[]): Promise<void> {
    try {
      await runTransaction(
        BaseInfrastructure.firestore,
        async (transaction) => {
          yogaClasses.forEach((yogaClass) => {
            const classDoc = doc(
              CalendarInfrastructure.classesCollection,
              yogaClass.id
            );
            transaction.delete(classDoc);
          });
        }
      );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteClass(id: string): Promise<void> {
    try {
      const classRef = doc(CalendarInfrastructure.classesCollection, id);
      const docSnap = await getDoc(classRef);

      if (docSnap.exists()) {
        await deleteDoc(classRef);
      } else {
        throw CustomError.classNotFound();
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public toModelYogaClass(obj: any): YogaClass {
    const result = new YogaClass(
      obj.name,
      obj.date,
      obj.day,
      obj.teacher,
      obj.time,
      obj.groupId,
      obj.checkins,
      obj.id
    );
    return result;
  }
}
