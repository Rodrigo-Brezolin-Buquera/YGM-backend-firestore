import {
  AddContractDTO,
  ChangeClassesDTO,
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
      id: req.params.id.trim(),
      token: req.headers.authorization!.trim()
    };
  }

  public static toCreateContractDTO(req: any): CreateContractDTO {
    return {
      email: req.body.email?.trim(),
      name: req.body.name?.trim(),
      plan: req.body.plan?.trim(),
      date: req.body.date?.trim(),
      token: req.headers.authorization!
    };
  }

  public static toEditContractDTO(req: any): EditContractDTO {
    return {
      id: req.params.id,
      name: req.body.name?.trim(),
      plan: req.body.plan?.trim(),
      availableClasses: req.body.availableClasses?.trim(),
      ends: req.body.ends?.trim(),
      started: req.body.started?.trim(),
      active: req.body.active,
      token: req.headers.authorization!
    };
  }

  public static toAddContractDTO(req: any): AddContractDTO {
    return {
      id: req.params.id,
      plan: req.body.plan?.trim(),
      date: req.body.date?.trim(),
      token: req.headers.authorization!
    };
  }

  public static toChangeClassesDTO(req: any): ChangeClassesDTO {
    return {
      id: req.params.id,
      action: req.params.action,
      token: req.headers.authorization!
    };
  }

  public static toTokenDTO(req: any): TokenDTO {
    return { token: req.headers.authorization! };
  }
}
