import { CalendarRepository } from "../application/calendar.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import { YogaClass } from "../domain/calendar.Entity";
import { CalendarFirestoreMapper } from "./calendar.Firestore.mapper";
import { ClassNotFound } from "../../../common/customError/notFound";

export class CalendarInfrastructure
  extends BaseInfrastructure
  implements CalendarRepository
{
  private classesCollection = BaseInfrastructure.admin
    .firestore()
    .collection("yogaClasses");

  public async findAllClasses(): Promise<YogaClass[]> {
    const yogaClasses = await this.classesCollection.get();

    const yogaClassesList = yogaClasses.docs.map((doc) => doc.data());
    const result = yogaClassesList.map((yogaClass) =>
      YogaClass.toYogaClass(yogaClass)
    );
    return result;
  }

  public async findClassById(id: string): Promise<YogaClass> {
    const classSnap = await this.classesCollection.doc(id).get();

    if (!classSnap.exists) {
      throw new ClassNotFound();
    }
    return YogaClass.toYogaClass(classSnap.data());
  }

  public async createClass(yogaClass: YogaClass): Promise<void> {
    await this.classesCollection
      .doc(yogaClass.id!)
      .set(CalendarFirestoreMapper.toFireStoreYogaClass(yogaClass));
  }

  public async editClass(yogaClass: YogaClass): Promise<void> {
    const yogaClasses = this.classesCollection.where("groupId", "==", yogaClass.groupId);

    await yogaClasses.get().then((classSnap) => {
      classSnap.forEach((doc) => doc.ref.update(CalendarFirestoreMapper.toFireStoreEditedYogaClass(yogaClass)));
    });
      
  }

  public async changeCapacity(id:string, capacity:number): Promise<void> {
    await this.classesCollection
      .doc(id)
      .update({capacity});
  }

  public async deleteAllClasses(groupId: string): Promise<void> {
    const yogaClasses = this.classesCollection.where("groupId", "==", groupId);

    await yogaClasses.get().then((classSnap) => {
      classSnap.forEach((doc) => doc.ref.delete());
    });
  }

  public async deleteClass(id: string): Promise<void> {
    const classDoc = await this.classesCollection.doc(id).get();

    if (classDoc.exists) {
      await this.classesCollection.doc(id).delete();
    } else {
      throw new ClassNotFound();
    }
  }
}
