import { Request, Response } from "express";
import { PlanApplication } from "../application/Aplication";
import { Plan } from "../domain/Domain";


export class PlanPresentation {
    constructor(private planApplication : PlanApplication) {}

    public async findPlans(req: Request, res: Response): Promise<void> {
        try {
           
      
            const plan: Plan[] = await this.planApplication.findPlans()
            res.status(201).send({ data: plan })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async createPlan(req: Request, res: Response): Promise<void> {
        try {
           

            await this.planApplication.createPlan()

            res.status(201).send({ message: "Plano criado com sucesso" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async editPlan(req: Request, res: Response): Promise<void> {
        try {
        

            await this.planApplication.editPlan()

            res.status(201).send({ message: "Plano alterado com sucesso" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

  
    public async deletePlan(req: Request, res: Response): Promise<void> {
        try {
         

            await this.planApplication.deletePlan()
            res.status(201).send({ message: "Plano deletado com sucesso" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

}