import axios from "axios";
import { baseURL } from "../../../common/constants/baseURL";
import { setHeader } from "../../../common/constants/setHeader";
import { Contract, YogaClass } from "../domain/booking.Types";


export const requestContract = async (
  token: string
): Promise<Contract> => {
  const URL: string = `${baseURL}/contracts/user`;
  const response = await axios.get(URL, setHeader(token));
  return response.data;
};

export const requestYogaClass = async (
  id: string,
  token: string
): Promise<YogaClass> => {
  const URL: string = `${baseURL}/calendar/${id}`;
  const response = await axios.get(URL, setHeader(token));
  return response.data;
};

export const requestChangeClass = async (
  id: string,
  action: string,
  token: string
): Promise<void> => {
  const URL: string = `${baseURL}/contracts/changeClasses/${action}/${id}`;
  await axios.put(URL,{},setHeader(token));
};
