import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { BookingRepository } from "../business/booking.Repository";
import { Checkin, CheckinObject } from "../domain/booking.Entity";
import { ChangeEntity } from "../domain/DTOs/booking.changeEntity.dto";
import { CustomError } from "../../../common/customError/customError";

export class BookingDatabase extends BaseDatabase implements BookingRepository {
  collectionName = "checkins";

  public async findCheckin(id: string): Promise<Checkin | null> {
    const checkin = await super.findById(id);
    return checkin ? Checkin.toModel(checkin as CheckinObject) : null;
  }

  public async findByEntity(
    id: string,
    entity: string,
    limit: number
  ): Promise<Checkin[]> {
    const snap = await this.collection()
      .where(entity, "==", id)
      .limit(limit)
      .get();
    return snap.docs.map((i) => Checkin.toModel(i.data() as CheckinObject));
  }

  public async createCheckin(checkin: Checkin): Promise<void> {
    await super.create(checkin, this.toFireStoreCheckin);
  }

  public async deleteCheckin(id: string): Promise<void> {
    await super.delete(id);
  }

  private toFireStoreCheckin(checkin: Checkin): object {
    return {
      id: checkin.getId(),
      name: checkin.getName(),
      date: checkin.getDate(),
      time: checkin.getTime(),
      yogaClassId: checkin.getClassId(),
      contractId: checkin.getContractId(),
    };
  }

  public async changeEntity(id: string, input: ChangeEntity): Promise<void> {
    // fazer uma cloud fucntion
    const { key, value, collection } = input;
    const snap = await BaseDatabase.firestore
      .collection(collection)
      .doc(id)
      .get();
    if (!snap.exists) {
      throw new CustomError("Não possui possível encontrar a aula/aluno", 404);
    }
    const data = snap.data()!;
    if ( value === -1 && data[key] <= 0) {
      throw new CustomError("Não há mais aulas disponíveis", 406);
    }
    const newData = { [key]: data[key] + value };
    await BaseDatabase.firestore
      .collection(collection)
      .doc(id)
      .set(newData, { merge: true });
  }
}
