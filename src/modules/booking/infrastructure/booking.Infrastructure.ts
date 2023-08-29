import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { BookingRepository } from "../application/booking.Repository";
import { Checkin } from "../domain/booking.Entity";
import { BookingFirestoreMapper } from "./booking.Firestore.mapper";
import { CheckinNotFound } from "../../../common/customError/notFound";

export class BookingInfrastructure
  extends BaseDatabase
  implements BookingRepository
{
  private contractCollection = BaseDatabase.admin
    .firestore()
    .collection("checkins");

  public async findCheckinById(id: string): Promise<Checkin | undefined> {
    const checkin = await this.contractCollection.doc(id).get();
    const result = checkin.data() && Checkin.toCheckin(checkin.data())
    return result;
  }

  public async findById(id: string, entity: string): Promise<Checkin[]> {
    const checkinDocs = await this.contractCollection
      .where(entity, "==", id)
      .get();
    const checkins = checkinDocs.docs.map((doc) =>
    Checkin.toCheckin(doc.data())
    );
    return checkins;
  }

  public async createCheckin(checkin: Checkin): Promise<void> {
    await this.contractCollection
      .doc(checkin.id)
      .create(BookingFirestoreMapper.toFireStoreCheckin(checkin));
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
