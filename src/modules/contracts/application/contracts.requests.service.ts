import axios from "axios";
import { PLAN } from "../domain/contracts.Types";
import { Plan } from "../domain/contracts.Types";
import { RequestUserDTO } from "../domain/contracts.DTO";
import { baseURL } from "../../../common/constants/baseURL";

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
  const signupURL: string = `${baseURL}/auth/createUser`;
  await axios.post(signupURL, { id, name, email, token });
};

export const requestDeleteUser = async (
  id: string,
  token: string
): Promise<void> => {
  const authURL: string = `${baseURL}/auth/${id}/${token}`;
  await axios.delete(authURL);
};
