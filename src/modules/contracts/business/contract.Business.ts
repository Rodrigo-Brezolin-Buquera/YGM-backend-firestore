import { Contract } from "../domain/contract.Entity";
import { ContractsRepository } from "./contracts.Repository";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { CreateContractDTO } from "../domain/DTOs/contract.create.dto";
import { formatDate } from "../../../common/utils/common.utils.formatDate";
import { calculateEndDate } from "./contract.utils.calculateEnd";
import { ChangePlanDTO } from "../domain/DTOs/contract.changePlan.dto";
import { ChangeClassesDTO } from "../domain/DTOs/contract.changeClasses.dto";
import { capitalizeFirstLetter } from "../../../common/utils/common.utils.capitilizeName";
import { NotFound } from "../../../common/customError/notFound";
import { CustomError } from "../../../common/customError/customError";
import { planTable } from "./contract.planTable";

export class ContractsBusiness {
  constructor(private contractDB: ContractsRepository) {}

  public async findAllContracts(): Promise<Contract[]> {
    return await this.contractDB.findAllContracts();
  }

  public async findContract({ id }: IdDTO): Promise<Contract | null> {
    return await this.contractDB.findContract(id);
  }

  public async createContract(input: CreateContractDTO): Promise<void> {
    const { id, name, plan, started } = input;
    const { availableClasses, durationInMonths } = planTable[plan];

    const alreadyExists = await this.contractDB.findContract(id);
    if (alreadyExists) {
      throw new CustomError("Contrato já existe", 409);
    }

    const planEnds = durationInMonths
      ? calculateEndDate(started, durationInMonths)
      : null;

    const contract = Contract.toModel({
      id,
      name: capitalizeFirstLetter(name),
      plan,
      availableClasses,
      started: formatDate(started),
      ends: planEnds,
    });

    await this.contractDB.createContract(contract);
    await this.contractDB.activeUser(contract.getId())
  }

  public async changePlan(input: ChangePlanDTO): Promise<void> {
    const { id, plan, started } = input;
    const { availableClasses, durationInMonths } = planTable[plan];

    const contract = await this.contractDB.findContract(id);

    if (!contract) {
      throw new NotFound("contrato");
    }

    const planEnds = durationInMonths
      ? calculateEndDate(started, durationInMonths)
      : null;

    contract.setPlan(plan);
    contract.setStarted(formatDate(started));
    contract.setEnds(planEnds);
    contract.setClasses(availableClasses);

    await this.contractDB.editContract(contract);
  }

  public async changeClasses(input: ChangeClassesDTO): Promise<void> {
    const { id, availableClasses } = input;

    const contract = await this.contractDB.findContract(id);

    if (!contract) {
      throw new NotFound("contrato");
    }

    contract.setClasses(availableClasses);
    await this.contractDB.editContract(contract);
  }
}
