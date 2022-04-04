import { Request, Response } from "express";
import { PlanApplication } from "../application/Aplication";
import { Plan } from "../domain/Domain";
import { PlanIdDTO, PlanDTO } from "../domain/Types";

export class PlanPresentation {
    constructor(private planApplication : PlanApplication) {}

    public async findPlans(req: Request, res: Response): Promise<void> {
        try {
           
      
            const plans: Plan[] = await this.planApplication.findPlans()
            res.status(201).send(plans)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async createPlan(req: Request, res: Response): Promise<void> {
        try {

            const input: PlanDTO = {
                type: req.body.type,
                frequency: req.body.frequency,
                availableClasses: req.body.availableClasses,
                durationInMonths: req.body.durationInMonths
            }

            await this.planApplication.createPlan(input)

            res.status(201).send({ message: "Plano criado com sucesso" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }


    public async deletePlan(req: Request, res: Response): Promise<void> {
        try {
            const input: PlanIdDTO = {
                id: req.params.id
            }

            await this.planApplication.deletePlan(input)
            res.status(201).send({ message: "Plano deletado com sucesso" })
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

}