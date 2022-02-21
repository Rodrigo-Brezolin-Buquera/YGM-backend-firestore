import {CustomError} from "../../../common/customError/customError"
import { Plan } from "../domain/Domain";
import { PlanRepository } from "./Repository";



export class PlanApplication {
    constructor(private planInfrastructure: PlanRepository) {}

    public async findPlans( ): Promise<Plan[]> {
        try {
           
            const result: Plan[] = await this.planInfrastructure.findPlans()

            return result 
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async createPlan(): Promise<void> {
        try {
          
           
            await this.planInfrastructure.postPlan()

        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }

    public async editPlan(): Promise<void> {
        try {
           
            await this.planInfrastructure.editPlan()
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }



    public async deletePlan(): Promise<void> {
        try {
          
            await this.planInfrastructure.deletePlan()
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }
}