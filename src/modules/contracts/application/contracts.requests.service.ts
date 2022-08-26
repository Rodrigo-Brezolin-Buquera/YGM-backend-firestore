import axios from "axios";
import { PLAN } from "../domain/contracts.Types";
import { Plan } from "../domain/contracts.Types";
import { RequestUserDTO } from "../domain/contracts.DTO";
import { baseURL } from "../../../common/constants/baseURL";
import { setHeader } from "../../../common/constants/setHeader";

export const requestPlanInfo = async (plan: PLAN): Promise<Plan> => {
  const planURL: string = `${baseURL}/plans/list`;
  const response = await axios.get(planURL);
  const plansList = response.data;
  return plansList.find((item: Plan) => item.id == plan);
};

export const requestCreateUser = async ({
  id,
  name,
  email,
  token,
}: RequestUserDTO): Promise<void> => {
  const URL: string = `${baseURL}/auth/createUser`;
  await axios.post(URL, { id, name, email }, setHeader(token));
};

export const requestDeleteUser = async (
  id: string,
  token: string
): Promise<void> => {
  const URL: string = `${baseURL}/auth/${id}`;
  await axios.delete(URL, setHeader(token));
};

export const requestDeleteCheckins = async (
  id: string,
  token: string
): Promise<void> => {
  const URL: string = `${baseURL}/contract/${id}`;
  await axios.delete(URL, setHeader(token));
};

