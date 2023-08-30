import { PLAN } from "../domain/contracts.Types";
import { Plan } from "../domain/contracts.Types";
import { RequestUserDTO } from "../domain/contracts.DTO";
import { RequestService } from "../../../common/aplication/common.Request.service";
import { IContractsRequestService } from "./contracts.ports";



export class ContractsRequestService extends RequestService implements IContractsRequestService {
public requestPlanInfo = async (plan: PLAN): Promise<Plan> => {
  const planURL: string = `${this.baseURL}/plans/list`;
  const response = await this.API.get(planURL);
  const plansList = response.data;
  return plansList.find((item: Plan) => item.id == plan);
};

public requestCreateUser = async ({
  id,
  name,
  email,
  token,
}: RequestUserDTO): Promise<void> => {
  const URL: string = `${this.baseURL}/auth/createUser`;
  await this.API.post(URL, { id, name, email }, this.setHeader(token));
};

public requestDeleteUser = async (
  id: string,
  token: string
): Promise<void> => {
  const URL: string = `${this.baseURL}/auth/${id}`;
  await this.API.delete(URL, this.setHeader(token));
};

public requestDeleteCheckins = async (
  id: string,
  token: string
): Promise<void> => {
  const URL: string = `${this.baseURL}/contract/${id}`;
  await this.API.delete(URL, this.setHeader(token));
};

}