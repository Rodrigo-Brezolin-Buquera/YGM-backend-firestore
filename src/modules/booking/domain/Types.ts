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

  export type ContractCheckinData = {
    contractCheckins: Checkin[],
    name: string
  }

  export type YogaClassCheckinData = {
    yogaClassCheckins: Checkin[],
    date: string
  }

