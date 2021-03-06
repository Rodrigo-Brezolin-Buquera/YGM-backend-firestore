import { CustomError } from "../../../common/customError/customError";
import { Contract } from "../domain/contracts.Entity";
import { ClosedContracts, CurrentContract, Checkin } from "../domain/contracts.Types";
import {
  ContractIdDTO,
  CreateContractDTO,
  AddContractDTO,
  EditContractDTO,
} from "../domain/contracts.DTO";
import { ContractsRepository } from "./contracts.Repository";
import {
  requestCreateUser,
  requestDeleteUser,
  requestPlanInfo,
} from "./contracts.requests.service";
import { calculateEndDate } from "./contracts.dates.service";

export class ContractsApplication {
  constructor(private contractsInfrastructure: ContractsRepository) {}

  public async findAllContracts(): Promise<Contract[]> {
    try {
      const result = await this.contractsInfrastructure.findAllContracts();
      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findContract(): Promise<Contract> {
    try {
      const contract = await this.contractsInfrastructure.findContract();
      return contract;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findContractById({ id }: ContractIdDTO): Promise<Contract> {
    try {
      const contract = await this.contractsInfrastructure.findContractById(id);
      return contract;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createContract({ email, name, plan, date }: CreateContractDTO): Promise<any> {
    try {
      const id = Contract.generateId();

      await requestCreateUser({ id, name, email });

      const { availableClasses, durationInMonths } = await requestPlanInfo(plan);
      const closedContracts: ClosedContracts[] = [];
      const currentContract: CurrentContract = {
        active: true,
        plan: plan,
        started: date,
        ends: calculateEndDate(date, durationInMonths),
        availableClasses,
        checkins: []
      };

      const contract = new Contract(id, name, closedContracts, currentContract);

      contract
        .checkName()
        .checkId(id)
        .checkClosedContracts()
        .checkCurrentContract();

      await this.contractsInfrastructure.createContract(contract);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async editContract(input: EditContractDTO): Promise<any> {
    try {
      const { id, name, plan, availableClasses, endDate, startDate, active } = input;
      const { closedContracts, currentContract } = await this.findContractById({id});
      const newCurrentContract: CurrentContract = {
        active,
        plan,
        started: startDate,
        ends: endDate,
        availableClasses,
        checkins: currentContract.checkins
      };
      const contract = new Contract(id,name, closedContracts, newCurrentContract);

      contract
        .checkName()
        .checkId(id)
        .checkClosedContracts()
        .checkCurrentContract();

      await this.contractsInfrastructure.editContract(contract);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async addNewContract({id, plan, date}: AddContractDTO): Promise<any> {
    try {
      const { name, closedContracts, currentContract } = await this.findContractById({ id });
      const { availableClasses, durationInMonths } = await requestPlanInfo(plan);
      const newCurrentContract: CurrentContract = {
        active: true,
        plan: plan,
        started: date,
        ends: calculateEndDate(date, durationInMonths),
        availableClasses,
        checkins:[] 
      };
      const closingContract: ClosedContracts = {
        plan: currentContract.plan,
        ended: currentContract.ends,
      };
      closedContracts.push(closingContract);

      const contract = new Contract(id, name, closedContracts, newCurrentContract);

      contract
        .checkName()
        .checkId(id)
        .checkClosedContracts()
        .checkCurrentContract();

      await this.contractsInfrastructure.editContract(contract);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteContract({ id }: ContractIdDTO): Promise<void> {
    try {
      await this.contractsInfrastructure.deleteContract(id);
      await requestDeleteUser(id);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
