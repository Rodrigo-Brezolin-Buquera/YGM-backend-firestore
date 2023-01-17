import { Checkin } from "../../../../../src/modules/booking/domain/booking.Entity";

export const checkinMock = Checkin.toCheckin({
    id: "ID",
    name: "Name teste",
    date: "20/01/2001",
    yogaClassId: "id",
    contractId: "id",
    verified: true,
  })
