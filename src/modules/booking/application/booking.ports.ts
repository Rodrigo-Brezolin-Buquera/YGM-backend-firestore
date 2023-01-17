import { Contract, YogaClass } from "../domain/booking.Types";

export interface IBookingRequestSerive {
  requestContract(token: string): Promise<Contract>;
  requestYogaClass(id: string, token: string): Promise<YogaClass>;
  requestChangeClass(id: string, action: string, token: string): Promise<void>;
  requestChangeCapacity(
    id: string,
    action: string,
    token: string
  ): Promise<void>;
}
