import { BookingRepository } from "../../../../src/modules/booking/business/booking.Repository";
import { Checkin } from "../../../../src/modules/booking/domain/booking.Entity";
import { ChangeEntity } from "../../../../src/modules/booking/domain/DTOs/booking.changeEntity.dto";

export const checkinMock = Checkin.toModel({
  id: "id",
  name: "name",
  date: "20/05/1989",
  time: "19:00",
  yogaClassId: "classId",
  contractId: "contractId",
});

export class BookingDatabaseMock implements BookingRepository {
  findByEntity = jest.fn(
    async (id: string, entity: string, limit: number): Promise<Checkin[]> => {
      return [checkinMock];
    }
  );
  changeEntity = jest.fn(
    async (id: string, input: ChangeEntity): Promise<void> => {}
  );
  findCheckin = jest.fn(async (id: string): Promise<Checkin | null> => {
    return id === "return+checkin" ? checkinMock : null;
  });

  createCheckin = jest.fn(async (checkin: Checkin): Promise<void> => {});
  deleteCheckin = jest.fn(async (id: string): Promise<void> => {});
}
