import {
  AddContractDTO,
  ContractIdDTO,
  CreateContractDTO,
  EditContractDTO,
  TokenDTO,
} from "./contracts.DTO";
import { Contract } from "./contracts.Entity";

export class ContractsMapper {
  public static toContract(obj: any): Contract {
    const result = new Contract(
      obj.id,
      obj.name,
      obj.closedContracts,
      obj.currentContract
    );
    return result;
  }

  public static toFireStoreContract(obj: Contract): any {
    return {
      id: obj.id,
      name: obj.name,
      closedContracts: obj.closedContracts,
      currentContract: obj.currentContract,
    };
  }

  public static toContractIdDTO(req: any): ContractIdDTO {
    return {
      id: req.params.id,
      token: req.headers.authorization
    };
  }

  public static toCreateContractDTO(req: any): CreateContractDTO {
    return {
      email: req.body.email,
      name: req.body.name,
      plan: req.body.plan,
      date: req.body.date,
      token: req.headers.authorization
    };
  }

  public static toEditContractDTO(req: any): EditContractDTO {
    return {
      id: req.params.id,
      name: req.body.name,
      plan: req.body.plan,
      availableClasses: req.body.availableClasses,
      ends: req.body.ends,
      started: req.body.started,
      active: req.body.active,
      token: req.headers.authorization
    };
  }

  public static toAddContractDTO(req: any): AddContractDTO {
    return {
      id: req.params.id,
      plan: req.body.plan,
      date: req.body.date,
      token: req.headers.authorization
    };
  }

  public static toTokenDTO(req: any): TokenDTO {
    return { token: req.headers.authorization };
  }
}
