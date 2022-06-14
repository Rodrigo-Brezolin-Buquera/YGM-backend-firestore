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
import { CalendarMapper } from "../domain/calendar.Mapper";

export class CalendarInfrastructure
  extends BaseInfrastructure
  implements CalendarRepository
{
  private classesCollection = BaseInfrastructure.admin
    .firestore()
    .collection("yogaClasses");

  // protected static classesCollection = collection(
  //   BaseInfrastructure.firestore,
  //   "yogaClasses"
  // );

  public async findAllClasses(): Promise<YogaClass[]> {
    try {
      const yogaClasses = await this.classesCollection.get();

      // const yogaClassesSnaphot = await getDocs(
      //   CalendarInfrastructure.classesCollection
      // );
      const yogaClassesList = yogaClasses.docs.map((doc) => doc.data());
      const result = yogaClassesList.map((yogaClass) =>
        CalendarMapper.toYogaClass(yogaClass)
      );
      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
  public async createClass(yogaClass: YogaClass): Promise<void> {
    try {
      await this.classesCollection
        .doc(yogaClass.id)
        .set(CalendarMapper.toFireStoreYogaClass(yogaClass));

      // const yogaClasseDoc = doc(
      //   CalendarInfrastructure.classesCollection,
      //   yogaClass.id
      // );

      // await setDoc(
      //   yogaClasseDoc,
      //   CalendarMapper.toFireStoreYogaClass(yogaClass)
      // );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async editClass(yogaClasses: YogaClass[]): Promise<void> {
    try {
      await BaseInfrastructure.admin
        .firestore()
        .runTransaction(async (transaction) => {
          yogaClasses.forEach((yogaClass) => {
            const classDocRef = this.classesCollection.doc(yogaClass.id);

            transaction.update(
              classDocRef,
              CalendarMapper.toFireStoreEditedYogaClass(yogaClass)
            );
          });
        });

      // await runTransaction(
      //   BaseInfrastructure.firestore,
      //   async (transaction) => {
      //     yogaClasses.forEach((yogaClass) => {
      //       const classDocRef = doc(
      //         CalendarInfrastructure.classesCollection,
      //         yogaClass.id
      //       );

      //       transaction.update(
      //         classDocRef,
      //         CalendarMapper.toFireStoreEditedYogaClass(yogaClass)
      //       );
      //     });
      //   }
      // );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteClasses(yogaClasses: YogaClass[]): Promise<void> {
    try {
      await BaseInfrastructure.admin
        .firestore()
        .runTransaction(async (transaction) => {
          yogaClasses.forEach((yogaClass) => {
            const classDocRef = this.classesCollection.doc(yogaClass.id);

            transaction.delete(classDocRef);
          });
        });

      // await runTransaction(
      //   BaseInfrastructure.firestore,
      //   async (transaction) => {
      //     yogaClasses.forEach((yogaClass) => {
      //       const classDoc = doc(
      //         CalendarInfrastructure.classesCollection,
      //         yogaClass.id
      //       );
      //       transaction.delete(classDoc);
      //     });
      //   }
      // );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteClass(id: string): Promise<void> {
    try {

      const classDoc = await this.classesCollection.doc(id).get()

      // const classRef = doc(CalendarInfrastructure.classesCollection, id);
      // const docSnap = await getDoc(classRef);

      if (classDoc.exists) {
        await this.classesCollection.doc(id).delete()
      } else {
        throw CustomError.classNotFound();
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
