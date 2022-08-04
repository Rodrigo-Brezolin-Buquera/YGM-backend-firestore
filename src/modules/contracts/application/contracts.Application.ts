import { CustomError } from "../../../common/customError/customError";
import { Contract } from "../domain/contracts.Entity";
import { ClosedContracts, CurrentContract } from "../domain/contracts.Types";
import {
  ContractIdDTO,
  CreateContractDTO,
  AddContractDTO,
  EditContractDTO,
  TokenDTO,
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

  public async findAllContracts({ token }: TokenDTO): Promise<Contract[]> {
    try {
      Contract.verifyAdminPermission(token);
      const result = await this.contractsInfrastructure.findAllContracts();
      return result;
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findContract({ token }: TokenDTO): Promise<Contract> {
    try {
      const id = Contract.verifyUserPermission(token)!.getTokenId(token);
      const contract = await this.contractsInfrastructure.findContract(id);
      return contract;
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findContractById({
    id,
    token,
  }: ContractIdDTO): Promise<Contract> {
    try {
      Contract.verifyAdminPermission(token!);
      Contract.checkId(id);
      const contract = await this.contractsInfrastructure.findContractById(
        id.trim()
      );
      return contract;
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createContract(input: CreateContractDTO): Promise<any> {
    try {
    
      const { email, name, plan, date, token } = input;
      Contract.verifyAdminPermission(token.trim());
      Contract.checkEmptyInput(input);
      const id = Contract.generateId();

      await requestCreateUser({ id, name, email, token });

      const { availableClasses, durationInMonths } = await requestPlanInfo(
        plan
      );

      const fixedDate = Contract.adjustDate(date);
      const closedContracts: ClosedContracts[] = [];
      const currentContract: CurrentContract = {
        active: true,
        plan: plan,
        started: fixedDate,
        ends: calculateEndDate(fixedDate, durationInMonths),
        availableClasses,
        checkins: [],
      };

      const contract = new Contract(id, name, closedContracts, currentContract);
      contract.checkName().checkClosedContracts().checkCurrentContract();
      Contract.checkId(id);

      await this.contractsInfrastructure.createContract(contract);
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async editContract(input: EditContractDTO): Promise<any> {
    try {
      const { id, name, plan, availableClasses, ends, started, active, token } =
        input;
      Contract.verifyAdminPermission(token);
      Contract.checkEmptyInput(input);
      const { closedContracts, currentContract } = await this.findContractById({
        id,
        token,
      });
      const newCurrentContract: CurrentContract = {
        active,
        plan,
        started: Contract.adjustDate(started),
        ends: Contract.adjustDate(ends),
        availableClasses,
        checkins: currentContract.checkins,
      };
      const contract = new Contract(
        id,
        name,
        closedContracts,
        newCurrentContract
      );

      contract.checkName().checkClosedContracts().checkCurrentContract();
      Contract.checkId(id);

      await this.contractsInfrastructure.editContract(contract);
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async addNewContract(input: AddContractDTO): Promise<any> {
    try {
      const { id, plan, date, token } = input;
      Contract.verifyAdminPermission(token);
      Contract.checkEmptyInput(input);
      const { name, closedContracts, currentContract } =
        await this.findContractById({ id, token });

      const { availableClasses, durationInMonths } = await requestPlanInfo(
        plan
      );
      const fixedDate = Contract.adjustDate(date);

      const newCurrentContract: CurrentContract = {
        active: true,
        plan: plan,
        started: fixedDate,
        ends: calculateEndDate(fixedDate, durationInMonths),
        availableClasses,
        checkins: [],
      };

      const closingContract: ClosedContracts = {
        plan: currentContract.plan,
        ended: currentContract.ends,
      };
      closedContracts.push(closingContract);

      const contract = new Contract(
        id,
        name,
        closedContracts,
        newCurrentContract
      );

      contract.checkName().checkClosedContracts().checkCurrentContract();
      Contract.checkId(id);

      await this.contractsInfrastructure.editContract(contract);
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteContract({ id, token }: ContractIdDTO): Promise<void> {
    try {
      Contract.verifyAdminPermission(token!);
      Contract.checkId(id);
      await this.contractsInfrastructure.deleteContract(id.trim());
      await requestDeleteUser(id, token!);
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}