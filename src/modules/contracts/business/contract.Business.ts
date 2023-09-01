import { Contract } from "../domain/contract.Entity";
import { ContractsRepository } from "./contracts.Repository";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { CreateContractDTO } from "../domain/DTOs/contract.create.dto";
import { planTable } from "../../../common/domain/common.enum";
import { formatDate } from "../../../common/utils/common.utils.formatDate";
import { calculateEndDate } from "./contract.utils.calculateEnd";
import { ChangePlanDTO } from "../domain/DTOs/contract.changePlan.dto";
import { ChangeClassesDTO } from "../domain/DTOs/contract.changeClasses.dto";
import { capitalizeFirstLetter } from "../../../common/utils/common.utils.capitilizeName";
import { ContractNotFound } from "../../../common/customError/notFound";
import { CustomError } from "../../../common/customError/customError";

export class ContractsBusiness {
    constructor(
    private contractDB: ContractsRepository
    ) {}

    public async findAllContracts(): Promise<Contract[]> {
        return await this.contractDB.findAllContracts();
    }

    public async findContract({ id }: IdDTO): Promise<Contract> {
        const contract = await this.contractDB.findContract(id);
        if(!contract){
            throw new ContractNotFound()
        }
        return contract
    }

    public async createContract(input: CreateContractDTO): Promise<any> {
        const { id, name, plan, started } = input;
        const { availableClasses, durationInMonths } = planTable[plan];

        const alreadyExists = await this.contractDB.findContract(id);
        if(alreadyExists){
            throw new CustomError("Contrato já existe", 409)
        }

        const planEnds = durationInMonths ? calculateEndDate(started, durationInMonths) : null;

        const contract = Contract.toModel({
            id,
            name : capitalizeFirstLetter(name),
            plan,
            availableClasses,
            started: formatDate(started),
            ends: planEnds,
        });

        await this.contractDB.createContract(contract);
    }

    public async changePlan(input: ChangePlanDTO): Promise<any> {
        const { id, plan, started } = input;
        const { availableClasses, durationInMonths } = planTable[plan];
    
        const contract = await this.contractDB.findContract(id)
        if(!contract){
            throw new ContractNotFound()
        }

        const planEnds = durationInMonths ? calculateEndDate(started, durationInMonths) : null;
    
        contract.setPlan(plan)
        contract.setStarted(formatDate(started))
        contract.setEnds(planEnds)
        contract.setClasses(availableClasses)
  
        await this.contractDB.editContract(contract);
    }

    public async changeClasses(input: ChangeClassesDTO): Promise<any> {
        const { id, availableClasses } = input;
        const contract = await this.contractDB.findContract(id)
        if(!contract){
            throw new ContractNotFound()
        }

        contract.setClasses(availableClasses)
        await this.contractDB.editContract(contract);
    }
}
