import { Request, Response } from "express";
import { ContractsBusiness } from "../business/contract.Business";
import { ContractsDTOMapper } from "./contract.DTO.mapper";

export class ContractsPresentation {
  constructor(private contractsApplication: ContractsBusiness) {}

  public async findAllContracts(req: Request, res: Response): Promise<void> {
    const input = ContractsDTOMapper.toTokenDTO(req);
    const result = await this.contractsApplication.findAllContracts(input);

    res.status(200).send(result);
  }

  public async findContract(req: Request, res: Response): Promise<void> {
    const input = ContractsDTOMapper.toTokenDTO(req);
    const result = await this.contractsApplication.findContract(input);

    res.status(200).send(result);
  }

  public async findContractById(req: Request, res: Response): Promise<void> {
    const input = ContractsDTOMapper.toContractIdDTO(req);

    const result = await this.contractsApplication.findContract(input);
    res.status(200).send(result);
  }

  public async createContract(req: Request, res: Response): Promise<void> {
    const input = ContractsDTOMapper.toCreateContractDTO(req);

    await this.contractsApplication.createContract(input);
    res.status(201).send({ message: "Contrato criado com sucesso" });
  }

  public async editContract(req: Request, res: Response): Promise<void> {
    const input = ContractsDTOMapper.toEditContractDTO(req);

    await this.contractsApplication.editContract(input);
    res.status(200).send({ message: "contrato editado com sucesso" });
  }

  public async addNewContract(req: Request, res: Response): Promise<void> {
    const input = ContractsDTOMapper.toAddContractDTO(req);

    // await this.contractsApplication.addNewContract(input);
    res.status(201).send({ message: "Novo contrato adicionado" });
  }

  public async changeClasses(req: Request, res: Response): Promise<void> {
    const input = ContractsDTOMapper.toChangeClassesDTO(req);

    // await this.contractsApplication.changeClasses(input);
    res.status(201).send({ message: "Quantidade de aulas alteradas" });
  }

  public async deleteContract(req: Request, res: Response): Promise<void> {
    const input = ContractsDTOMapper.toContractIdDTO(req);
    await this.contractsApplication.deleteContract(input);
    res.status(200).send({ message: "Contrato deletado com sucesso" });
  }
  
}
