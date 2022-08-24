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
    const modeledYogaClassCheckins = yogaClassCheckins.map((item) =>
      BookingMapper.toFireStoreCheckin(item)
    );

    await this.yogaClassCollection.doc(yogaClassId).update({
      checkins: modeledYogaClassCheckins,
    });
  }

  public async findByIdWith(yogaClassId: string): Promise<YogaClass> {
    const yogaClassDoc = await this.yogaClassCollection.doc(yogaClassId).get();

    if (!yogaClassDoc.exists) {
      throw new ClassNotFound();
    }

    return BookingMapper.toYogaClass(yogaClassDoc.data());
  }
}
