import { CustomError, PlanNotFound } from "../../../common/customError/customError";
import { ContractsRepository } from "../application/Repository";
import { Contract } from "../domain/Domain";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { BaseInfrastructure } from "../../../config/firebase";

export class ContractsInfrastructure extends BaseInfrastructure implements ContractsRepository {
    protected static planCollection = collection(BaseInfrastructure.firestore, "contracts")

    findAllContracts(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    findContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    findContractById(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    createContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    editContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    addNewContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }


    alterPlanStatus(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    deleteContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    toModelPan(obj: any): any {
        // const result = new Contract()
        // return result
    }

  

}

