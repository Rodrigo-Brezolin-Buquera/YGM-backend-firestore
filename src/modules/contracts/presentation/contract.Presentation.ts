import { Request, Response } from "express";
import { ContractsApplication } from "../application/Aplication";
import { ContractsMapper } from "../domain/contracts.mapper";

export class ContractsPresentation {
  constructor(private contractsApplication: ContractsApplication) {}

  public async findAllContracts(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.contractsApplication.findAllContracts();
      
      res.status(201).send(result);
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async findContract(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.contractsApplication.findContract();

      res.status(201).send(result);
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async findContractById(req: Request, res: Response): Promise<void> {
    try {
      const input = ContractsMapper.toModelContractIdDTO(req.body)

      const result = await this.contractsApplication.findContractById(input);
      res.status(201).send(result);
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async createContract(req: Request, res: Response): Promise<void> {
    try {
      const input = ContractsMapper.toModelCreateContractDTO(req.body)

      await this.contractsApplication.createContract(input);
      res.status(201).send({ message: "Contrato criado com sucesso" });
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async editContract(req: Request, res: Response): Promise<void> {
    try {
      const input = ContractsMapper.toModelEditContractDTO(req)

      await this.contractsApplication.editContract(input);
      res.status(201).send({ message: "contrato editado com sucesso" });
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async addNewContract(req: Request, res: Response): Promise<void> {
    try {
      const input = ContractsMapper.toModelAddContractDTO(req)

      await this.contractsApplication.addNewContract(input);
      res.status(201).send({ message: "Novo contrato adicionado" });
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async deleteContract(req: Request, res: Response): Promise<void> {
    try {
      const input = ContractsMapper.toModelContractIdDTO(req.body)

      await this.contractsApplication.deleteContract(input);
      res.status(201).send({ message: "Contrato deletado com sucesso" });
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }
}
