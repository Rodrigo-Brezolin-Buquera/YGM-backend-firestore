import { YogaClass } from "../../calendar/domain/Domain";
import { Contract } from "../../contracts/domain/Domain";
import { Checkin } from "./Domain";

export type CreateCheckinDTO = {
  contractId: string,
  yogaClassId: string
};

export type ValidateCheckinDTO = {
    checkinId: string,
    verified: boolean
  };

  export type DeleteCheckinDTO = {
    checkinId: string
  };

 
