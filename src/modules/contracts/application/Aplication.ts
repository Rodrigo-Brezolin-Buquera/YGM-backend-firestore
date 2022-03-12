import { CustomError } from "../../../common/customError/customError";
import { generateId } from "../../../common/services/IdGenerator";
import { Contract } from "../domain/Domain";
import {
  checkin,
  closedContracts,
  contractIdDTO,
  createContractDTO,
  currentContract,
  PLAN,
} from "../domain/Types";
import axios from "axios";

import { ContractsRepository } from "./Repository";
import { baseURL } from "../../../common/constants/baseURL";
import moment from "moment";

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

  public async findContract(): Promise<any> {
    try {
      await this.contractsInfrastructure.findContract();
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async findContractById({id}: contractIdDTO): Promise<Contract> {
    try {
      const contract = await this.contractsInfrastructure.findContractById(id);

      return contract
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
      const id = generateId();

      // mudar a URl na versão final!!! - usar headers!!!
      const signupURL: string = `${baseURL}/auth/signup`;
      await axios.post(signupURL, { id, name, email });

      const planURL: string = `${baseURL}/plans/list`;
      const response = await axios.get(planURL)
      const plansList = response.data  
      const {availableClasses, durationInMonths} = plansList.find((item)=> item.id === plan )

      const momentResult = moment(date, "DD-MM-YYYY").add(durationInMonths, "months").calendar();
      const [month, day, year] = momentResult.split("/")
      const endDate = `${day}/${month}/${year}`

      const closedContracts: closedContracts[] = [];
      const checkins: checkin[] = [];

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

  public async editContract(): Promise<any> {
    try {
      await this.contractsInfrastructure.editContract();
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async addNewContract(): Promise<any> {
    try {
      await this.contractsInfrastructure.addNewContract();
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async alterPlanStatus(): Promise<any> {
    try {
      await this.contractsInfrastructure.alterPlanStatus();
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteContract({id}:contractIdDTO): Promise<void> {
    try {
      await this.contractsInfrastructure.deleteContract(id);
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
