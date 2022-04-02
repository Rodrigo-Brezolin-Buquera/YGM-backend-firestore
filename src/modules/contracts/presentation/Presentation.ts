import { Request, Response } from "express";
import { ContractsApplication } from "../application/Aplication";
import { Contract } from "../domain/Domain";
import { addContractDTO, contractIdDTO, createContractDTO, editContractDTO } from "../domain/Types";

export class ContractsPresentation {
    constructor(private contractsApplication : ContractsApplication) {}

    public async findAllContracts(req: Request, res: Response): Promise<void> {
        try {
            const result =  await this.contractsApplication.findAllContracts()
            res.status(201).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findContract(req: Request, res: Response): Promise<void> {
        try {
        
            const result = await this.contractsApplication.findContract()

            res.status(201).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findContractById(req: Request, res: Response): Promise<void> {
        try {
            const input: contractIdDTO = {
                id: req.params.id
            }
           
            const result = await this.contractsApplication.findContractById(input)
            res.status(201).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async createContract(req: Request, res: Response): Promise<void> {
        try {
           const input : createContractDTO = {
              email: req.body.email,
              name: req.body.name,
              plan: req.body.plan,
              date: req.body.date
            }

             await this.contractsApplication.createContract(input)
          
            res.status(201).send({ message:"Contrato criado com sucesso" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async editContract(req: Request, res: Response): Promise<void> {
        try {
            const input:editContractDTO = {
                id: req.params.id,
                name: req.body.name,
                plan: req.body.plan,
                availableClasses: req.body.availableClasses,
                endDate: req.body.endDate,
                startDate: req.body.startDate,
                active: req.body.active
            }
           
      
             await this.contractsApplication.editContract(input)
            res.status(201).send({message: "contrato editado com sucesso"  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async addNewContract(req: Request, res: Response): Promise<void> {
        try { 
            const input : addContractDTO = {
            id: req.params.id,
            plan: req.body.plan,
            date: req.body.date
          }
           
             await this.contractsApplication.addNewContract(input)
            res.status(201).send({message: "Novo contrato adicionado"  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteContract(req: Request, res: Response): Promise<void> {
        try {
            const input: contractIdDTO = {
                id: req.params.id
            }
           
             await this.contractsApplication.deleteContract(input)
            res.status(201).send({ message: "Contrato deletado com sucesso"  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    


}