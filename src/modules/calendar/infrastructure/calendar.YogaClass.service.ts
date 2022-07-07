import { CustomError } from "../../../common/customError/customError";
import { CalendarRepository } from "../application/calendar.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import { YogaClass } from "../domain/calendar.Entity";
import { CalendarMapper } from "../domain/calendar.Mapper";
import { ClassNotFound } from "../../../common/customError/notFound";

export class CalendarInfrastructure
  extends BaseInfrastructure
  implements CalendarRepository
{
  private classesCollection = BaseInfrastructure.admin.firestore().collection("yogaClasses");

  public async findAllClasses(): Promise<YogaClass[]> {
    try {
      const yogaClasses = await this.classesCollection.get();
     
      const yogaClassesList = yogaClasses.docs.map((doc) => doc.data());
      const result = yogaClassesList.map((yogaClass) =>
        CalendarMapper.toYogaClass(yogaClass)
      );
      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findClassById(id:string): Promise<YogaClass> {
    try {
      const classSnap = await this.classesCollection.doc(id).get();

      if (!classSnap.exists) {
        throw new ClassNotFound()
      }
      return CalendarMapper.toYogaClass(classSnap.data());

    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createClass(yogaClass: YogaClass): Promise<void> {
    try {
      await this.classesCollection
        .doc(yogaClass.id)
        .set(CalendarMapper.toFireStoreYogaClass(yogaClass));
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
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteAllClasses(groupId): Promise<void> {
    try {
      const yogaClasses = this.classesCollection
      .where("groupId", "==", groupId)

      await yogaClasses.get().then((classSnap)=>{
        classSnap.forEach(doc=> doc.ref.delete())
      })
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteClass(id: string): Promise<void> {
    try {
      const classDoc = await this.classesCollection.doc(id).get();

      if (classDoc.exists) {
        await this.classesCollection.doc(id).delete();
      } else {
        throw new ClassNotFound()
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
