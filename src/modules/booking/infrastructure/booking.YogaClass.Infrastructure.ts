import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "../application/booking.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import { Checkin } from "../domain/booking.Entity";
import { YogaClass } from "../domain/booking.Types";
import { BookingMapper } from "../domain/booking.Mapper";
import { ClassNotFound } from "../../../common/customError/notFound";

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
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findByIdWith(yogaClassId: string): Promise<YogaClass> {
    try {
      const yogaClassDoc = await this.yogaClassCollection
        .doc(yogaClassId)
        .get();

      if (!yogaClassDoc.exists) {
        throw new ClassNotFound()
      }

      return BookingMapper.toYogaClass(yogaClassDoc.data());
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
