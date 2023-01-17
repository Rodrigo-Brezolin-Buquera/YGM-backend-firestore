import { IContractsRequestService } from "../../../../../src/modules/contracts/application/contracts.ports";
import { RequestUserDTO } from "../../../../../src/modules/contracts/domain/contracts.DTO";
import { PLAN, Plan } from "../../../../../src/modules/contracts/domain/contracts.Types";

export class ContractsRequestServiceMock implements IContractsRequestService {
     requestPlanInfo= jest.fn(async(plan: PLAN): Promise<Plan>=> {
        return {
            id: "id",
            type: "Mensal",
            frequency: "1x",
            availableClasses: 12,
            durationInMonths: 1
         }
    })
 requestCreateUser= jest.fn(async({ id, name, email, token }: RequestUserDTO): Promise<void>=> {
        
    })
  requestDeleteUser= jest.fn(async(id: string, token: string): Promise<void> =>{
        
    })
  requestDeleteCheckins= jest.fn(async(id: string, token: string): Promise<void> =>{
        
    })
   
    }