import { IContractsRequestService } from "../../../../../src/modules/contracts/application/contracts.ports";
import { RequestUserDTO } from "../../../../../src/modules/contracts/domain/contracts.DTO";
import { PLAN, Plan } from "../../../../../src/modules/contracts/domain/contracts.Types";

export class ContractsRequestServiceMock implements IContractsRequestService {
    async requestPlanInfo(plan: PLAN): Promise<Plan> {
        return {
            id: "id",
            type: "Mensal",
            frequency: "1x",
            availableClasses: 12,
            durationInMonths: 1
         }
    }
    async requestCreateUser({ id, name, email, token }: RequestUserDTO): Promise<void> {
        
    }
    async requestDeleteUser(id: string, token: string): Promise<void> {
        
    }
    async requestDeleteCheckins(id: string, token: string): Promise<void> {
        
    }
   
    }