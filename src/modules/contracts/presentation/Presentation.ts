import { Request, Response } from "express";
import { ContractsApplication } from "../application/Aplication";
import { Contract } from "../domain/Domain";
import { createContractDTO } from "../domain/Types";



export class ContractsPresentation {
    constructor(private contractsApplication : ContractsApplication) {}

    public async findAllContracts(req: Request, res: Response): Promise<void> {
        try {
            const result =  await this.contractsApplication.findAllContracts()
            res.status(201).send({ result })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findContract(req: Request, res: Response): Promise<void> {
        try {
           
      
             await this.contractsApplication.findContract()
            res.status(201).send({  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async findContractById(req: Request, res: Response): Promise<void> {
        try {
           
      
             await this.contractsApplication.findContractById()
            res.status(201).send({ })
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
           
      
             await this.contractsApplication.editContract()
            res.status(201).send({  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async addNewContract(req: Request, res: Response): Promise<void> {
        try {
           
      
             await this.contractsApplication.addNewContract()
            res.status(201).send({  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async alterPlanStatus(req: Request, res: Response): Promise<void> {
        try {
           
      
             await this.contractsApplication.alterPlanStatus()
            res.status(201).send({  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteContract(req: Request, res: Response): Promise<void> {
        try {
           
      
             await this.contractsApplication.deleteContract()
            res.status(201).send({  })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    


}