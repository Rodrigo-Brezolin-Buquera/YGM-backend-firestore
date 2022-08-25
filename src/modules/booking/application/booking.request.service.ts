import axios from "axios";
import { baseURL } from "../../../common/constants/baseURL";
import {Contract, YogaClass} from "../domain/booking.Types"

export const requestContract= async (id: string): Promise<Contract> => {
    const URL: string = `${baseURL}/contracts/${id}`;
    const response = await axios.get(URL);
    return response.data
  };

  export const requestYogaClass= async (id: string): Promise<YogaClass> => {
    const URL: string = `${baseURL}/calendar/${id}`;
    const response = await axios.get(URL);
    return response.data
  };