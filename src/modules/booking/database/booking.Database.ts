import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { BookingRepository } from "../business/booking.Repository";
import { Checkin } from "../domain/booking.Entity";
import { CheckinNotFound } from "../../../common/customError/notFound";

export class BookingDatabase  extends BaseDatabase
  implements BookingRepository
{
  collectionName = "checkins"

  public async findCheckin(id: string): Promise<Checkin | null> {
    const checkin = await super.findById(id)
    return checkin ? Checkin.toModel(checkin) : null
    }

  public async findByEntity(id: string, entity: string, limit:number): Promise<Checkin[]> {
    const snap = await this.collection()
      .where(entity, "==", id)
      .limit(limit)
      .get();
     return snap.docs.map((i) => Checkin.toModel(i.data()));
  }

  public async createCheckin(checkin: Checkin): Promise<void> {
    await super.create(checkin, this.toFireStoreCheckin)
  }
 

  public async deleteCheckin(id: string): Promise<void> {
  //  const checkin= await this.findCheckinById(id);
  //   if (!checkin) {
  //       throw new CheckinNotFound();
  //     }
    await super.delete(id)
  }

  private toFireStoreCheckin(checkin: Checkin): any {
    return {
      id: checkin.getId(),
      name: checkin.getName(),
      date: checkin.getDate(),
      time: checkin.getTime(),
      yogaClassId: checkin.getClassId(),
      contractId: checkin.getContractId(),
    };
  }

  // changeContract
  // changeClass
}
