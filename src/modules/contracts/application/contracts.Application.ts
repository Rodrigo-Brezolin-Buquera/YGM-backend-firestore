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
import { IDateService, IIdService, ITokenService } from "../../../common/aplication/common.ports";
import { IContractsRequestService } from "./contracts.ports";


export class ContractsApplication {
  constructor(
    private contractsInfrastructure: ContractsRepository,
    private tokenService: ITokenService,
    private idService: IIdService,
    private dateService: IDateService,
    private requestService: IContractsRequestService
    
    ) {}

  public async findAllContracts({ token }: TokenDTO): Promise<Contract[]> {
    this.tokenService.verifyAdminPermission(token);
    const result = await this.contractsInfrastructure.findAllContracts();
    return result;
  }

  public async findContract({ token }: TokenDTO): Promise<Contract> {
    this.tokenService.verifyUserPermission(token)
    const id = this.tokenService.getTokenId(token);
    const contract = await this.contractsInfrastructure.findContract(id);
    return contract;
  }

  public async findContractById({
    id,
    token,
  }: ContractIdDTO): Promise<Contract> {
    this.tokenService.verifyUserPermission(token);
    Contract.checkId(id);
    const contract = await this.contractsInfrastructure.findContractById(id);
    return contract;
  }

  public async createContract(input: CreateContractDTO): Promise<any> {
    const { email, name, plan, date, token } = input;
    this.tokenService.verifyAdminPermission(token);
    const id = this.idService.generateId();

    const { availableClasses, durationInMonths } = await this.requestService.requestPlanInfo(plan);
   
    const fixedDate = this.dateService.adjustDate(date);
    const closedContracts: ClosedContracts[] = [];
    const currentContract: CurrentContract = {
      active: true,
      plan: plan,
      started: fixedDate,
      ends: this.dateService.calculateEndDate(date, durationInMonths),
      availableClasses,
    };
   
    const contract = Contract.toContract({
      id,
      name,
      currentContract,
      closedContracts,
    });
    contract.checkName().checkClosedContracts().checkCurrentContract();
    Contract.checkId(id);

    await Promise.all([
      await this.requestService.requestCreateUser({ id, name, email, token }),
      await this.contractsInfrastructure.createContract(contract),
    ]);
  }

  public async editContract(input: EditContractDTO): Promise<any> {
    const { id, name, plan, availableClasses, ends, started, active, token } =
      input;
      this.tokenService.verifyAdminPermission(token);

    const { closedContracts } = await this.findContractById({
      id,
      token,
    });

    const newCurrentContract: CurrentContract = {
      active,
      plan,
      started: this.dateService.adjustDate(started),
      ends: this.dateService.adjustDate(ends),
      availableClasses,
    };

    const contract = Contract.toContract({
      id,
      name,
      currentContract: newCurrentContract,
      closedContracts,
    });

    contract.checkName().checkCurrentContract();
    Contract.checkId(id);

    await this.contractsInfrastructure.editContract(contract);
  }

  public async addNewContract(input: AddContractDTO): Promise<any> {
    const { id, plan, date, token } = input;
    this.tokenService.verifyAdminPermission(token);
    const { name, closedContracts, currentContract } =
      await this.findContractById({ id, token });

    const { availableClasses, durationInMonths } = await this.requestService.requestPlanInfo(plan);
    const fixedDate = this.dateService.adjustDate(date);

    const newCurrentContract: CurrentContract = {
      active: true,
      plan: plan,
      started: fixedDate,
      ends: this.dateService.calculateEndDate(fixedDate, durationInMonths),
      availableClasses,
    };

    const closingContract: ClosedContracts = {
      plan: currentContract.plan,
      ended: currentContract.ends,
    };
    closedContracts.push(closingContract);

    const contract = Contract.toContract({
      id,
      name,
      currentContract: newCurrentContract,
      closedContracts,
    });

    contract.checkName().checkClosedContracts().checkCurrentContract();
    Contract.checkId(id);

    await this.contractsInfrastructure.editContract(contract);
  }

  public async changeClasses(input: ChangeClassesDTO): Promise<any> {
    const { id, action, token } = input;
    this.tokenService.verifyUserPermission(token);
    const { name, closedContracts, currentContract } =
      await this.findContractById({ id, token });

    if (action === ACTION.ADD) {
      currentContract.availableClasses = currentContract.availableClasses as number + 1;
    } else if (action === ACTION.SUBTRACT) {
      currentContract.availableClasses = currentContract.availableClasses as number - 1;
    } else {
      throw new InvalidAction();
    }

    const contract = new Contract(id, name, closedContracts, currentContract);

    contract.checkName().checkClosedContracts().checkCurrentContract();
    Contract.checkId(id);

    await this.contractsInfrastructure.editContract(contract);
  }

  public async deleteContract({ id, token }: ContractIdDTO): Promise<void> {
    this.tokenService.verifyAdminPermission(token);
    Contract.checkId(id);

    await Promise.all([
      await this.contractsInfrastructure.deleteContract(id),
      await this.requestService.requestDeleteUser(id, token),
      await this.requestService.requestDeleteCheckins(id, token)
    ])
  
  }
}
