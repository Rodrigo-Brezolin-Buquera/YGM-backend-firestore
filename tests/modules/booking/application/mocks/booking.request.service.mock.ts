import { IBookingRequestSerive } from "../../../../../src/modules/booking/application/booking.ports";
import {
  Contract,
  PLAN,
  YogaClass,
} from "../../../../../src/modules/booking/domain/booking.Types";

export class BookingRequestServiceMock implements IBookingRequestSerive {
  async requestContract(token: string): Promise<Contract> {
    return {
      id: "id",
      name: "name",
      closedContracts: [
        {
          plan: PLAN.MONTHLYX1,
          ended: "20/12/2010",
        },
      ],
      currentContract: {
        active: true,
        plan: PLAN.MONTHLYX2,
        started: "20/12/2010",
        ends: "20/12/2011",
        availableClasses: 10,
      },
    };
  }
  async requestYogaClass(id: string, token: string): Promise<YogaClass> {
    return {
      name: "name",
      date: "20/12/2010",
      day: "Segunda",
      teacher: "Rodrigo",
      time: "18:00",
      capacity: 9,
      groupId: "id",
      id: "id",
    };
  }
  async requestChangeClass(
    id: string,
    action: string,
    token: string
  ): Promise<void> {}
  async requestChangeCapacity(
    id: string,
    action: string,
    token: string
  ): Promise<void> {}
}
