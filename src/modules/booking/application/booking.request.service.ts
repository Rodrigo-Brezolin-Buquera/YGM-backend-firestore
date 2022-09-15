import { RequestService } from "../../../common/aplication/common.Request.service";
import { Contract, YogaClass } from "../domain/booking.Types";
import { IBookingRequestSerive } from "./booking.ports";

export class BookingRequestService extends RequestService implements IBookingRequestSerive {
  public requestContract = async (
    token: string
  ): Promise<Contract> => {
    const URL: string = `${this.baseURL}/contracts/user`;
    const response = await this.API.get(URL, this.setHeader(token));
    return response.data;
  };
  
  public requestYogaClass = async (
    id: string,
    token: string
  ): Promise<YogaClass> => {
    const URL: string = `${this.baseURL}/calendar/${id}`;
    const response = await this.API.get(URL, this.setHeader(token));
    return response.data;
  };
  
  public requestChangeClass = async (
    id: string,
    action: string,
    token: string
  ): Promise<void> => {
    const URL: string = `${this.baseURL}/contracts/changeClasses/${action}/${id}`;
    await this.API.put(URL,{},this.setHeader(token));
  };
  
  public requestChangeCapacity = async (
    id: string,
    action: string,
    token: string
  ): Promise<void> => {
    const URL: string = `${this.baseURL}/calendar/changeCapacity/${action}/${id}`;
    await this.API.put(URL,{},this.setHeader(token));
  };
}




