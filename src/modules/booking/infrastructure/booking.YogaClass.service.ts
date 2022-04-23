import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "../application/booking.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore/lite";
import { Checkin } from "../domain/booking.Entity";
import { YogaClass } from "../domain/booking.Types";
import { BookingMapper } from "../domain/booking.Mapper";

export class BookingYogaClassService
  extends BaseInfrastructure
  implements BookingRepository
{

  protected static yogaClassCollection = collection(
    BaseInfrastructure.firestore,
    "yogaClasses"
  );

  public async changeCheckinsList(
    yogaClassCheckins: Checkin[],
    yogaClassId: string
  ): Promise<void> {
    try {
      
      const modeledYogaClassCheckins = yogaClassCheckins.map((item) =>
      BookingMapper.toFireStoreCheckin(item)
      );

      const yogaClassDoc = doc(
        BookingYogaClassService.yogaClassCollection,
        yogaClassId
      );

      await updateDoc(yogaClassDoc, {
        checkins: modeledYogaClassCheckins
      });


    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async findByIdWith(yogaClassId: string): Promise<YogaClass> {
    try {
      const yogaClassRef = doc(
        BookingYogaClassService.yogaClassCollection,
        yogaClassId
      );
      const yogaClassDoc = await getDoc(yogaClassRef);

      if (!yogaClassDoc.exists()) {
        throw CustomError.classNotFound();
      }

      return BookingMapper.toYogaClass(yogaClassDoc.data());
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

}
