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

