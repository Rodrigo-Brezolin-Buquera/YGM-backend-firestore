import { CustomError } from "../../../common/customError/customError";
import { generateId } from "../../../common/services/IdGenerator";
import { Contract } from "../domain/Domain";
import {
  contractsCheckin,
  closedContracts,
  contractIdDTO,
  createContractDTO,
  currentContract,
  addContractDTO,
  editContractDTO,
} from "../domain/Types";
import { ContractsRepository } from "./Repository";
import {
  requestDeleteContract,
  requestPlanInfo,
  requestSignup,
} from "../../../common/services/requests";
import { calculateEndDate } from "../../../common/services/calculateEndDate";

export class ContractsApplication {
  constructor(private contractsInfrastructure: ContractsRepository) {}

  public async findAllContracts(): Promise<Contract[]> {
    try {
      const result = await this.contractsInfrastructure.findAllContracts();

      return result;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async findContract(): Promise<Contract> {
    try {
      const contract = await this.contractsInfrastructure.findContract();

      return contract;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async findContractById({ id }: contractIdDTO): Promise<Contract> {
    try {
      const contract = await this.contractsInfrastructure.findContractById(id);

      return contract;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async createContract(input: createContractDTO): Promise<any> {
    try {
      const { email, name, plan, date } = input;
      const id = await requestSignup({ name, email });
      const { availableClasses, durationInMonths } = await requestPlanInfo(
        plan
      );
      const endDate = calculateEndDate(date, durationInMonths);
      const closedContracts: closedContracts[] = [];
      const checkins: contractsCheckin[] = [];

      const currentContract: currentContract = {
        active: true,
        plan: plan,
        started: date,
        ends: endDate,
        availableClasses,
        checkins,
      };

      const contract = new Contract(id, name, closedContracts, currentContract);

      contract
        .checkName(name)
        .checkId(id)
        .checkClosedContracts(closedContracts)
        .checkCurrentContract(currentContract);

      await this.contractsInfrastructure.createContract(contract);
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async editContract(input: editContractDTO): Promise<any> {
    try {
      const { id, name, plan, availableClasses, endDate, startDate, active } =
        input;
      const { closedContracts, currentContract } = await this.findContractById({
        id,
      });
      const { checkins } = currentContract;

      const newCurrentContract: currentContract = {
        active,
        plan,
        started: startDate,
        ends: endDate,
        availableClasses,
        checkins,
      };

      const contract = new Contract(
        id,
        name,
        closedContracts,
        newCurrentContract
      );

      contract
        .checkName(name)
        .checkId(id)
        .checkClosedContracts(closedContracts)
        .checkCurrentContract(currentContract);

      await this.contractsInfrastructure.editContract(contract);
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async addNewContract({
    id,
    plan,
    date,
  }: addContractDTO): Promise<any> {
    try {
      const { name, closedContracts, currentContract } =
        await this.findContractById({ id });
      const closingContract: closedContracts = {
        plan: currentContract.plan,
        ended: currentContract.ends,
      };
      closedContracts.push(closingContract);

      const { availableClasses, durationInMonths } = await requestPlanInfo(
        plan
      );
      const endDate = calculateEndDate(date, durationInMonths);
      const checkins: contractsCheckin[] = [];

      const newCurrentContract: currentContract = {
        active: true,
        plan: plan,
        started: date,
        ends: endDate,
        availableClasses,
        checkins,
      };

      const contract = new Contract(
        id,
        name,
        closedContracts,
        newCurrentContract
      );

      contract
        .checkName(name)
        .checkId(id)
        .checkClosedContracts(closedContracts)
        .checkCurrentContract(currentContract);

      await this.contractsInfrastructure.editContract(contract);
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteContract({ id }: contractIdDTO): Promise<void> {
    try {
      await this.contractsInfrastructure.deleteContract(id);

      await requestDeleteContract(id);
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
