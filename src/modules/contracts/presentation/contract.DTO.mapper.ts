import {
  AddContractDTO,
  ChangeClassesDTO,
  ContractIdDTO,
  CreateContractDTO,
  EditContractDTO,
  TokenDTO,
} from "../domain/contracts.DTO";

export class ContractsDTOMapper {
  public static toContractIdDTO(req: any): ContractIdDTO {
    return {
      id: req.params.id.trim(),
      token: req.headers.authorization!.trim(),
    };
  }

  public static toCreateContractDTO(req: any): CreateContractDTO {
    return {
      email: req.body.email?.trim(),
      name: req.body.name?.trim(),
      plan: req.body.plan?.trim(),
      date: req.body.date?.trim(),
      token: req.headers.authorization!,
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
      token: req.headers.authorization!,
    };
  }

  public static toAddContractDTO(req: any): AddContractDTO {
    return {
      id: req.params.id,
      plan: req.body.plan?.trim(),
      date: req.body.date?.trim(),
      token: req.headers.authorization!,
    };
  }

  public static toChangeClassesDTO(req: any): ChangeClassesDTO {
    return {
      id: req.params.id,
      action: req.params.action,
      token: req.headers.authorization!,
    };
  }

  public static toTokenDTO(req: any): TokenDTO {
    return { token: req.headers.authorization! };
  }
}
