import { BookingRepository } from "../../../../../src/modules/booking/application/booking.Repository";
import { Checkin } from "../../../../../src/modules/booking/domain/booking.Entity";

export class BookingInfrastructureMock implements BookingRepository {
  async findCheckinById(id: string): Promise<Checkin | undefined> {
    return Checkin.toCheckin({
      id: "ID",
      name: "Name",
      date: "20/01/2001",
      yogaClassId: "id",
      contractId: "id",
      verified: true,
    });
  }
  async findById(id: string, entity: string): Promise<Checkin[]> {
    return [
      Checkin.toCheckin({
        id: "ID",
        name: "Name",
        date: "20/01/2001",
        yogaClassId: "id",
        contractId: "id",
        verified: true,
      }),
    ];
  }
  async createCheckin(checkin: Checkin): Promise<void> {}
  async validateCheckin(id: string, verified: boolean): Promise<void> {}
  async deleteCheckin(id: string): Promise<void> {}
  async deleteAllCheckinByContract(id: string): Promise<void> {}
}
