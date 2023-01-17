import { Checkin } from "../domain/booking.Entity";

export class BookingFirestoreMapper {
  public static toFireStoreCheckin(Checkin: Checkin): any {
    const result = {
      id: Checkin.id,
      verified: Checkin.verified,
      name: Checkin.name,
      date: Checkin.date,
      yogaClassId: Checkin.yogaClassId,
      contractId: Checkin.contractId,
    };
    return result;
  }
}
