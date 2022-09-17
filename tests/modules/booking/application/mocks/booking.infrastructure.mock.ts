import { BookingRepository } from "../../../../../src/modules/booking/application/booking.Repository";
import { Checkin } from "../../../../../src/modules/booking/domain/booking.Entity";
import { checkinMock } from "./Checkin.mock";

export class BookingInfrastructureMock implements BookingRepository {
  async findCheckinById(id: string): Promise<Checkin | undefined> {
    return id === "RETURN+CHECKIN" ? checkinMock : undefined
  }
  async findById(id: string, entity: string): Promise<Checkin[]> {
    return id === "RETURN+CHECKIN" ? [checkinMock, checkinMock] : []
  }
  async createCheckin(checkin: Checkin): Promise<void> {}
  async validateCheckin(id: string, verified: boolean): Promise<void> {}
  async deleteCheckin(id: string): Promise<void> {}
  async deleteAllCheckinByContract(id: string): Promise<void> {}
}
