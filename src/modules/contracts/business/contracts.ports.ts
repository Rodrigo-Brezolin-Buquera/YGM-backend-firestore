import { RequestUserDTO } from "../domain/contracts.DTO";
import { Plan, PLAN } from "../domain/contracts.Types";

export interface IContractsRequestService {
  requestPlanInfo(plan: PLAN): Promise<Plan>;
  requestCreateUser({ id, name, email, token }: RequestUserDTO): Promise<void>;
  requestDeleteUser(id: string, token: string): Promise<void>;
  requestDeleteCheckins(id: string, token: string): Promise<void>;
}
