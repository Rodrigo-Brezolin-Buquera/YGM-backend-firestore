import { Request, Response } from "express";
import { ContractsApplication } from "../application/contracts.Application";
import { ContractsMapper } from "../domain/contracts.mapper";

export class ContractsPresentation {
  constructor(private contractsApplication: ContractsApplication) {}

  public async findAllContracts(req: Request, res: Response): Promise<void> {
    const input = ContractsMapper.toTokenDTO(req);
    const result = await this.contractsApplication.findAllContracts(input);

    res.status(200).send(result);
  }

  public async findContract(req: Request, res: Response): Promise<void> {
    const input = ContractsMapper.toTokenDTO(req);
    const result = await this.contractsApplication.findContract(input);

    res.status(200).send(result);
  }

  public async findContractById(req: Request, res: Response): Promise<void> {
    const input = ContractsMapper.toContractIdDTO(req);

    const result = await this.contractsApplication.findContractById(input);
    res.status(200).send(result);
  }

  public async createContract(req: Request, res: Response): Promise<void> {
    const input = ContractsMapper.toCreateContractDTO(req);

    await this.contractsApplication.createContract(input);
    res.status(201).send({ message: "Contrato criado com sucesso" });
  }

  public async editContract(req: Request, res: Response): Promise<void> {
    const input = ContractsMapper.toEditContractDTO(req);

    await this.contractsApplication.editContract(input);
    res.status(200).send({ message: "contrato editado com sucesso" });
  }

  public async addNewContract(req: Request, res: Response): Promise<void> {
    const input = ContractsMapper.toAddContractDTO(req);

    await this.contractsApplication.addNewContract(input);
    res.status(201).send({ message: "Novo contrato adicionado" });
  }

  public async changeClasses(req: Request, res: Response): Promise<void> {
    const input = ContractsMapper.toChangeClassesDTO(req);

    await this.contractsApplication.changeClasses(input);
    res.status(201).send({ message: "Novo contrato adicionado" });
  }

  public async deleteContract(req: Request, res: Response): Promise<void> {
    const input = ContractsMapper.toContractIdDTO(req);
    await this.contractsApplication.deleteContract(input);
    res.status(200).send({ message: "Contrato deletado com sucesso" });
  }
  
}
