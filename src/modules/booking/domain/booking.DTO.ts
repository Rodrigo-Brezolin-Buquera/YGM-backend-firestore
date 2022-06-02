import { Contract, YogaClass } from "./booking.Types";

export interface CreateCheckinDTO {
  contractId: string,
  yogaClassId: string
};

export interface ValidateCheckinDTO {
    checkinId: string,
    verified: boolean
  };

  export interface CheckinIdDTO {
    checkinId: string
  };

 
export interface CheckinDTO {
  contract : Contract,
  yogaClass : YogaClass
}