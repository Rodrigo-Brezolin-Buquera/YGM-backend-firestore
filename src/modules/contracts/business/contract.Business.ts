import { Contract } from "../domain/contract.Entity";
import { ContractsRepository } from "./contracts.Repository";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { CreateContractDTO } from "../domain/DTOs/contract.create.dto";
import { planTable } from "../../../common/domain/common.enum";
import { formatDate } from "../../../common/utils/common.utils.formatDate";
import { calculateEndDate } from "./contract.utils.calculateEnd";
import { ChangePlanDTO } from "../domain/DTOs/contract.changePlan.dto";

export class ContractsBusiness {
  constructor(
    private contractDB: ContractsRepository
  ) {}

  public async findAllContracts(): Promise<Contract[]> {
    return await this.contractDB.findAllContracts();
  }

  public async findContract({ id }: IdDTO): Promise<Contract> {
    return await this.contractDB.findContract(id);
  }

  public async createContract(input: CreateContractDTO): Promise<any> {
    const { id, name, plan, started } = input;
    const { availableClasses, durationInMonths } = planTable[plan];

    const planEnds = durationInMonths ? calculateEndDate(started, durationInMonths) : null;

    const contract = Contract.toModel({
      id,
      name,
      plan,
      availableClasses,
      started: formatDate(started),
      ends: planEnds,
    });

    await this.contractDB.createContract(contract);
  }

  public async changePlan(input: ChangePlanDTO): Promise<any> {
    const { id, plan, started } = input;
    const { availableClasses, durationInMonths } = planTable[plan];
    const contract = await this.contractDB.findContract(id)

    const planEnds = durationInMonths ? calculateEndDate(started, durationInMonths) : null;
    
    contract.setPlan(plan)
    contract.setStarted(formatDate(started))
    contract.setEnds(planEnds)
    contract.setClasses(availableClasses)
  
    await this.contractDB.editContract(contract);
  }

  // public async changeClasses(input: ChangeClassesDTO): Promise<any> {
  //   const { id, action, token } = input;
  //   this.tokenService.verifyUserPermission(token);
  //   const { name, closedContracts, currentContract } =
  //     await this.findContract(id);

  //   if (action === ACTION.ADD) {
  //     currentContract.availableClasses = currentContract.availableClasses as number + 1;
  //   } else if (action === ACTION.SUBTRACT) {
  //     currentContract.availableClasses = currentContract.availableClasses as number - 1;
  //   } else {
  //     throw new InvalidAction();
  //   }

  //   const contract = new Contract(id, name, closedContracts, currentContract);

  //   contract.checkName().checkClosedContracts().checkCurrentContract();
  //   Contract.checkId(id);

  //   await this.contractDB.editContract(contract);
  // }
}
