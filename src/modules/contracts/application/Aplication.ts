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
import axios from "axios";

import { ContractsRepository } from "./Repository";
import { baseURL } from "../../../common/requests/baseURL";
import moment from "moment";
import { getPlanInfo } from "../../../common/requests/plans";
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

      return contract
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
      // isolar em arquivo separado todas as requisições!!!
      const planURL: string = `${baseURL}/plans/list`;
      const response = await axios.get(planURL)
      const plansList = response.data  
      const {availableClasses, durationInMonths} = plansList.find((item)=> item.id === plan )

      const momentResult = moment(date, "DD-MM-YYYY").add(durationInMonths, "months").calendar();
      const [month, day, year] = momentResult.split("/")
      const endDate = `${day}/${month}/${year}`

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

      const signupURL: string = `${baseURL}/auth/signup`;
      await axios.post(signupURL, { id, name, email });

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async editContract(input: editContractDTO): Promise<any> {
    try {
      const { id, name, plan, availableClasses, endDate, startDate, active } = input
      const {closedContracts, currentContract } = await this.findContractById({id})
      const {checkins} = currentContract

      const newCurrentContract: currentContract = {
        active,
        plan,
        started: startDate,
        ends: endDate,
        availableClasses,
        checkins,
      };

      const contract = new Contract(id, name, closedContracts, newCurrentContract);

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

  public async addNewContract({id, plan, date}:addContractDTO): Promise<any> {
    try {

      const {name, closedContracts, currentContract } = await this.findContractById({id})
      const closingContract: closedContracts = {
        plan: currentContract.plan,
        ended: currentContract.ends
      }
      closedContracts.push(closingContract)
     
      // const planURL: string = `${baseURL}/plans/list`;
      // const response = await axios.get(planURL)
      // const plansList = response.data  
      // const {availableClasses, durationInMonths} = plansList.find((item)=> item.id === plan )
      const {availableClasses, durationInMonths} = await getPlanInfo(plan)

      // const momentResult = moment(date, "DD-MM-YYYY").add(durationInMonths, "months").calendar();
      // const [month, day, year] = momentResult.split("/")
      // const endDate = `${day}/${month}/${year}`
      const endDate = calculateEndDate(date, durationInMonths)

      const checkins: contractsCheckin[] = [];

      const newCurrentContract: currentContract = {
        active: true,
        plan: plan,
        started: date,
        ends: endDate,
        availableClasses,
        checkins,
      };

      const contract = new Contract(id, name, closedContracts, newCurrentContract);

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

  public async deleteContract({id}:contractIdDTO): Promise<void> {
    try {
      await this.contractsInfrastructure.deleteContract(id);

      const authURL: string = `${baseURL}/auth/${id}`;
      await axios.delete(authURL)

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
