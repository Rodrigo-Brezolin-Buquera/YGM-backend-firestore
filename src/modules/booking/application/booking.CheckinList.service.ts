import { DoubleCheckin } from "../../../common/customError/conflicts";
import { CustomError } from "../../../common/customError/customError";
import { Checkin } from "../domain/booking.Entity";

export const removeCheckinFromList = (contractList: Checkin[],yogaClassList:Checkin[] , checkinId: string): CheckinsLists => {
  const contractCheckins = contractList.filter((item) => item.id !== checkinId);
  const yogaClassCheckins = yogaClassList.filter((item) => item.id !== checkinId);
  return {contractCheckins, yogaClassCheckins}
};

export const addCheckinToList = (contractCheckins: Checkin[],yogaClassCheckins:Checkin[] , newCheckin: Checkin): CheckinsLists => {
  contractCheckins.push(newCheckin)
  yogaClassCheckins.push(newCheckin)
return {contractCheckins, yogaClassCheckins}
}

export const editCheckinFromList = (contractList: Checkin[],yogaClassList:Checkin[], newCheckin: Checkin): CheckinsLists => {
  let {contractCheckins, yogaClassCheckins} = removeCheckinFromList(contractList, yogaClassList, newCheckin.id)
   return addCheckinToList(contractCheckins, yogaClassCheckins, newCheckin)
}

export const verifyIfCheckinExists = (contractList: Checkin[], checkinId: string): void => {
  const verifyCheckin = contractList.findIndex(
    (item) => item.id === checkinId
  );
  if (verifyCheckin !== -1) {
   throw new DoubleCheckin()
  }

}  

type CheckinsLists = {
  contractCheckins: Checkin[],
  yogaClassCheckins: Checkin[]
}