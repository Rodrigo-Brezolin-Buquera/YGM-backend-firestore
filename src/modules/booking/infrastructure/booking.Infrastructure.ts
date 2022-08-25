import { BaseInfrastructure } from "../../../config/firebase";
import { BookingRepository } from "../application/booking.Repository";
import { Checkin } from "../domain/booking.Entity";
import { BookingMapper } from "../domain/booking.Mapper";
import { CheckinNotFound } from "../../../common/customError/notFound";

export class BookingInfrastructure
  extends BaseInfrastructure
  implements BookingRepository
{
  private contractCollection = BaseInfrastructure.admin
    .firestore()
    .collection("checkins");

  public async findCheckinById(id: string): Promise<Checkin> {
    const checkin = await this.contractCollection.doc(id).get();
    return BookingMapper.toCheckin(checkin.data());
  }

  public async findById(id: string, entity: string): Promise<Checkin[]> {
    const checkinDocs = await this.contractCollection
      .where(entity, "==", id)
      .get();
    const checkins = checkinDocs.docs.map((doc) =>
      BookingMapper.toCheckin(doc.data())
    );

    if (!checkins.length) {
      throw new CheckinNotFound();
    }

    return checkins;
  }

  public async createCheckin(checkin: Checkin): Promise<void> {
    await this.contractCollection
      .doc(checkin.id)
      .create(BookingMapper.toFireStoreCheckin(checkin));
  }
  public async validateCheckin(id: string,verified: boolean ): Promise<void> {
    const checkin= await this.findCheckinById(id);

    if (!checkin) {
      throw new CheckinNotFound();
    }

    await this.contractCollection
      .doc(id)
      .update({ verified });
  }

  public async deleteCheckin(id: string): Promise<void> {
   const checkin= await this.findCheckinById(id);
    if (!checkin) {
        throw new CheckinNotFound();
      }
    await this.contractCollection.doc(id).delete();
  }

  public async deleteAllCheckinByContract(id: string): Promise<void> {
    const checkins = await this.findById(id, "contractId");
    const promises = checkins.map(
      async (doc) => await this.contractCollection.doc(doc.id).delete()
    );
    await Promise.all(promises);
  }
}
