export type createCheckinDTO = {
  contractId: string,
  yogaClassId: string,
  name: string,
  date: string,
};

export type validateCheckinDTO = {
    checkinId: string,
    verified: boolean
  };

  export type deleteCheckinDTO = {
    checkinId: string
  };

