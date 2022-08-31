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
    id: string,
    token: string,
  };

  export interface CheckinTokenDTO {
    token: string,
  };
 
export interface CheckinDTO {
  contract : Contract,
  yogaClass : YogaClass
}
export interface FindCheckinDTO {
  id: string,
  entity: string,
  token: string,

}