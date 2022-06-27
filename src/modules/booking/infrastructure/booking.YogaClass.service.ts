import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "../application/booking.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { Checkin } from "../domain/booking.Entity";
import { YogaClass } from "../domain/booking.Types";
import { BookingMapper } from "../domain/booking.Mapper";

export class BookingYogaClassService
  extends BaseInfrastructure
  implements BookingRepository
{
  private yogaClassCollection = BaseInfrastructure.admin
    .firestore()
    .collection("yogaClasses");

  public async changeCheckinsList(
    yogaClassCheckins: Checkin[],
    yogaClassId: string
  ): Promise<void> {
    try {
      const modeledYogaClassCheckins = yogaClassCheckins.map((item) =>
        BookingMapper.toFireStoreCheckin(item)
      );

      await this.yogaClassCollection.doc(yogaClassId).update({
        checkins: modeledYogaClassCheckins,
      });
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findByIdWith(yogaClassId: string): Promise<YogaClass> {
    try {
      const yogaClassDoc = await this.yogaClassCollection
        .doc(yogaClassId)
        .get();

      if (!yogaClassDoc.exists) {
        throw CustomError.classNotFound();
      }

      return BookingMapper.toYogaClass(yogaClassDoc.data());
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
