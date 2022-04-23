import { Checkin } from "../domain/booking.Entity";

export const removeCheckinFromList = (checkinList: Checkin[], checkinId: string): Checkin[] => {
  return checkinList.filter((item) => item.id !== checkinId);
};

export const addCheckinToList = (checkinList: Checkin[], newCheckin: Checkin): Checkin[] => {
  checkinList.push(newCheckin)
  return checkinList
}

export const editCheckinFromList = (checkinList: Checkin[], newCheckin: Checkin): Checkin[] => {
  let filteredList = removeCheckinFromList(checkinList, newCheckin.id)
  return addCheckinToList(filteredList, newCheckin)
}