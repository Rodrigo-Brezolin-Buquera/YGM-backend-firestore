import { CustomError } from "../../../common/customError/customError";
import { Contract } from "../domain/Domain";
// import { } from "../domain/Types";
import { ContractsRepository } from "./Repository";

export class ContractsApplication {
  constructor(private contractsInfrastructure: ContractsRepository) {}

  public async findAllContracts(): Promise<Contract[]> {
    try {

     const result =  await this.contractsInfrastructure.findAllContracts();

     return result
      
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

  public async findContractById(): Promise<any> {
    try {
       await this.contractsInfrastructure.findContractById();

      
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async createContract(): Promise<any> {
    try {
       await this.contractsInfrastructure.createContract();

      
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

  public async deleteContract(): Promise<any> {
    try {
       await this.contractsInfrastructure.deleteContract();

      
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

}