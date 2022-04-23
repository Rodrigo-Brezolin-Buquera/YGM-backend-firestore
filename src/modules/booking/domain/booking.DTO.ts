import { Contract, YogaClass } from "./booking.Types";

export type CreateCheckinDTO = {
  contractId: string,
  yogaClassId: string
};

export type ValidateCheckinDTO = {
    checkinId: string,
    verified: boolean
  };

  export type CheckinIdDTO = {
    checkinId: string
  };

 
export type CheckinDTO = {
  contract : Contract,
  yogaClass : YogaClass
}