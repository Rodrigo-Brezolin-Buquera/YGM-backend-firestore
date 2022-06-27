import { Contract, YogaClass } from "./booking.Types";

export interface CreateCheckinDTO {
  contractId: string,
  yogaClassId: string,
  token: string
};

export interface ValidateCheckinDTO {
    checkinId: string,
    verified: boolean,
    token: string
  };

  export interface CheckinIdDTO {
    checkinId: string,
    token: string
  };

 
export interface CheckinDTO {
  contract : Contract,
  yogaClass : YogaClass
}