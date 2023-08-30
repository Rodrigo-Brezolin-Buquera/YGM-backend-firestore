import { Contract } from "../domain/contracts.Entity";
import {
  ACTION,
  ClosedContracts,
  CurrentContract,
} from "../domain/contracts.Types";
import {
  ContractIdDTO,
  CreateContractDTO,
  AddContractDTO,
  EditContractDTO,
  TokenDTO,
  ChangeClassesDTO,
} from "../domain/contracts.DTO";
import { ContractsRepository } from "./contracts.Repository";
import { InvalidAction } from "../../../common/customError/invalidRequests";
import { IIdService } from "../../../common/aplication/common.ports";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { ContractNotFound } from "../../../common/customError/notFound";

export class ContractsBusiness {
  constructor(
    private contractDB: ContractsRepository,
    private idService: IIdService
  ) {}

  public async findAllContracts(): Promise<Contract[]> {
    return await this.contractDB.findAllContracts();
  }

  public async findContract({ id }: IdDTO): Promise<any> {
    const contract = await this.contractDB.findContract(id);
    if (!contract) {
      throw new ContractNotFound();
    }
    return contract;
  }


  public async createContract(input: CreateContractDTO): Promise<any> {
    const { email, name, plan, date, token } = input;
    const id = this.idService.generateId();

    const { availableClasses, durationInMonths } =

    // const fixedDate = this.dateService.adjustDate(date);
    // const closedContracts: ClosedContracts[] = [];
    // const currentContract: CurrentContract = {
    //   active: true,
    //   plan: plan,
    //   started: fixedDate,
    //   ends: this.dateService.calculateEndDate(date, durationInMonths),
    //   availableClasses,
    // };

    const contract = Contract.toModel({
      id,
      name,
      currentContract,
      closedContracts,
    });
    contract.checkName().checkClosedContracts().checkCurrentContract();
    Contract.checkId(id);

    await Promise.all([
      await this.requestService.requestCreateUser({ id, name, email, token }),
      await this.contractDB.createContract(contract),
    ]);
  }

  public async editContract(input: EditContractDTO): Promise<any> {
    const { id, name, plan, availableClasses, ends, started, active, token } =
      input;

    // const { closedContracts } = await this.findContract({
    //   id,
    //   token,
    // });

    const newCurrentContract: CurrentContract = {
      active,
      plan,
      started: this.dateService.adjustDate(started),
      ends: this.dateService.adjustDate(ends),
      availableClasses,
    };

    const contract = Contract.toModel({
      id,
      name,
      currentContract: newCurrentContract,
      // closedContracts,
    });

    contract.checkName().checkCurrentContract();
    Contract.checkId(id);

    await this.contractDB.editContract(contract);
  }

  // public async addNewContract(input: AddContractDTO): Promise<any> {
  //   const { id, plan, date, token } = input;
  //   this.tokenService.verifyAdminPermission(token);
  //   const { name, closedContracts, currentContract } =
  //     await this.findContract({ id, token });

  //   const { availableClasses, durationInMonths } = await this.requestService.requestPlanInfo(plan);
  //   const fixedDate = this.dateService.adjustDate(date);

  //   const newCurrentContract: CurrentContract = {
  //     active: true,
  //     plan: plan,
  //     started: fixedDate,
  //     ends: this.dateService.calculateEndDate(fixedDate, durationInMonths),
  //     availableClasses,
  //   };
  //   console.log(newCurrentContract)
  //   const closingContract: ClosedContracts = {
  //     plan: currentContract.plan,
  //     ended: currentContract.ends,
  //   };
  //   closedContracts.push(closingContract);

  //   const contract = Contract.toContract({
  //     id,
  //     name,
  //     currentContract: newCurrentContract,
  //     closedContracts,
  //   });

  //   contract.checkName().checkClosedContracts().checkCurrentContract();
  //   Contract.checkId(id);

  //   await this.contractDB.editContract(contract);
  // }

  // public async changeClasses(input: ChangeClassesDTO): Promise<any> {
  //   const { id, action, token } = input;
  //   this.tokenService.verifyUserPermission(token);
  //   const { name, closedContracts, currentContract } =
  //     await this.findContract(id);

  //   if (action === ACTION.ADD) {
  //     currentContract.availableClasses = currentContract.availableClasses as number + 1;
  //   } else if (action === ACTION.SUBTRACT) {
  //     currentContract.availableClasses = currentContract.availableClasses as number - 1;
  //   } else {
  //     throw new InvalidAction();
  //   }

  //   const contract = new Contract(id, name, closedContracts, currentContract);

  //   contract.checkName().checkClosedContracts().checkCurrentContract();
  //   Contract.checkId(id);

  //   await this.contractDB.editContract(contract);
  // }

  public async deleteContract({ id, token }: ContractIdDTO): Promise<void> {
    Contract.checkId(id);

    await Promise.all([
      await this.contractDB.deleteContract(id),
     
    ]);
  }
}
