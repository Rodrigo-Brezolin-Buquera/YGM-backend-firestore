import { Contract } from "../domain/contracts.Entity";
import {
  ACTION,
  ClosedContracts,
  CurrentContract,
} from "../domain/contracts.Types";
import {
  ContractIdDTO,
  CreateContractDTO,
  AddContractDTO,
  EditContractDTO,
  TokenDTO,
  ChangeClassesDTO,
} from "../domain/contracts.DTO";
import { ContractsRepository } from "./contracts.Repository";
import {
  requestCreateUser,
  requestDeleteCheckins,
  requestDeleteUser,
  requestPlanInfo,
} from "./contracts.requests.service";
import { calculateEndDate } from "./contracts.dates.service";
import { InvalidAction } from "../../../common/customError/invalidRequests";
import { ContractsMapper } from "../domain/contracts.mapper";

export class ContractsApplication {
  constructor(private contractsInfrastructure: ContractsRepository) {}

  public async findAllContracts({ token }: TokenDTO): Promise<Contract[]> {
    Contract.verifyAdminPermission(token);
    const result = await this.contractsInfrastructure.findAllContracts();
    return result;
  }

  public async findContract({ token }: TokenDTO): Promise<Contract> {
    const id = Contract.verifyUserPermission(token)!.getTokenId(token);
    const contract = await this.contractsInfrastructure.findContract(id);
    return contract;
  }

  public async findContractById({
    id,
    token,
  }: ContractIdDTO): Promise<Contract> {
    Contract.verifyUserPermission(token);
    Contract.checkId(id);
    const contract = await this.contractsInfrastructure.findContractById(id);
    return contract;
  }

  public async createContract(input: CreateContractDTO): Promise<any> {
    const { email, name, plan, date, token } = input;
    Contract.verifyAdminPermission(token);
    const id = Contract.generateId();

    await requestCreateUser({ id, name, email, token });

    const { availableClasses, durationInMonths } = await requestPlanInfo(plan);

    const fixedDate = Contract.adjustDate(date);
    const closedContracts: ClosedContracts[] = [];
    const currentContract: CurrentContract = {
      active: true,
      plan: plan,
      started: fixedDate,
      ends: calculateEndDate(fixedDate, durationInMonths),
      availableClasses,
    };

    const contract = ContractsMapper.toContract({
      id,
      name,
      currentContract,
      closedContracts,
    });
    contract.checkName().checkClosedContracts().checkCurrentContract();
    Contract.checkId(id);

    await this.contractsInfrastructure.createContract(contract);
  }

  public async editContract(input: EditContractDTO): Promise<any> {
    const { id, name, plan, availableClasses, ends, started, active, token } =
      input;
    Contract.verifyAdminPermission(token);

    const { closedContracts } = await this.findContractById({
      id,
      token,
    });

    const newCurrentContract: CurrentContract = {
      active,
      plan,
      started: Contract.adjustDate(started),
      ends: Contract.adjustDate(ends),
      availableClasses,
    };

    const contract = ContractsMapper.toContract({
      id,
      name,
      currentContract: newCurrentContract,
      closedContracts,
    });

    contract.checkName().checkCurrentContract();
    Contract.checkId(id);

    await this.contractsInfrastructure.editContract(contract);
  }

  public async addNewContract(input: AddContractDTO): Promise<any> {
    const { id, plan, date, token } = input;
    Contract.verifyAdminPermission(token);
    const { name, closedContracts, currentContract } =
      await this.findContractById({ id, token });

    const { availableClasses, durationInMonths } = await requestPlanInfo(plan);
    const fixedDate = Contract.adjustDate(date);

    const newCurrentContract: CurrentContract = {
      active: true,
      plan: plan,
      started: fixedDate,
      ends: calculateEndDate(fixedDate, durationInMonths),
      availableClasses,
    };

    const closingContract: ClosedContracts = {
      plan: currentContract.plan,
      ended: currentContract.ends,
    };
    closedContracts.push(closingContract);

    const contract = ContractsMapper.toContract({
      id,
      name,
      currentContract: newCurrentContract,
      closedContracts,
    });

    contract.checkName().checkClosedContracts().checkCurrentContract();
    Contract.checkId(id);

    await this.contractsInfrastructure.editContract(contract);
  }

  public async changeClasses(input: ChangeClassesDTO): Promise<any> {
    const { id, action, token } = input;
    Contract.verifyUserPermission(token);
    const { name, closedContracts, currentContract } = await this.findContractById({id,
      token,
    });

    if (action === ACTION.ADD) {
      currentContract.availableClasses += 1;
    } else if (action === ACTION.SUBTRACT) {
      currentContract.availableClasses -= 1;
    } else {
      throw new InvalidAction();
    }

    const contract = new Contract(id, name, closedContracts, currentContract);

    contract.checkName().checkClosedContracts().checkCurrentContract();
    Contract.checkId(id);

    await this.contractsInfrastructure.editContract(contract);
  }

  public async deleteContract({ id, token }: ContractIdDTO): Promise<void> {
    Contract.verifyAdminPermission(token);
    Contract.checkId(id);
    await this.contractsInfrastructure.deleteContract(id);
    await requestDeleteUser(id, token);
    await requestDeleteCheckins(id, token);
  }
}
