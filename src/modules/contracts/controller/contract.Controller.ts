import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { ContractsBusiness } from "../business/contract.Business";
import { ChangeClassesSchema } from "../domain/DTOs/contract.changeClasses.dto";
import { ChangePlanSchema } from "../domain/DTOs/contract.changePlan.dto";
import { CreateContractSchema } from "../domain/DTOs/contract.create.dto";

export class ContractController {
  constructor(private contractBusiness: ContractsBusiness) {}

  public async findAllContracts(req: Request, res: Response): Promise<void> {
    const result = await this.contractBusiness.findAllContracts();
    res.status(200).send({result});
  }

  public async findContract(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({ id: req.body.tokenId });
    const result = await this.contractBusiness.findContract(input);
    res.status(200).send({result});
  }

  public async findContractById(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({ id: req.params.id });
    const result = await this.contractBusiness.findContract(input);
    res.status(200).send({result});
  }

  public async createContract(req: Request, res: Response): Promise<void> {
    const input = CreateContractSchema.parse({
      id: req.params.userId,
      name: req.body.name ,
      plan: req.body.plan,
      started: req.body.started,
    })
    await this.contractBusiness.createContract(input);
    res.status(201).send({ message: "Contrato criado com sucesso" });
  }

  public async changePlan(req: Request, res: Response): Promise<void> {
    const input = ChangePlanSchema.parse({
      id: req.params.id,
      plan: req.body.plan,
      started: req.body.started,
    })
    await this.contractBusiness.changePlan(input);
    res.status(200).send({ message: "Contrato editado com sucesso" });
  }



  public async changeClasses(req: Request, res: Response): Promise<void> {
    const input = ChangeClassesSchema.parse({
      id: req.params.id,
      availableClasses: req.body.availableClasses
    })
    await this.contractBusiness.changeClasses(input);
    res.status(201).send({ message: "Quantidade de aulas alteradas" });
  }


  
}
