import {
  ActiveIsNotBoolean,
  ClosedContractsArray,
  IncompatibleDates,
} from "../../../common/customError/conflicts";
import {
  InvalidClassQuantity,
  InvalidClassString,
  InvalidName,
  InvalidPlan,
} from "../../../common/customError/invalidRequests";
import { CommonDomain } from "../../../common/domain/CommonDomain";
import { ClosedContracts, CurrentContract } from "./contracts.Types";

export class Contract extends CommonDomain {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly closedContracts: ClosedContracts[],
    public readonly currentContract: CurrentContract
  ) {
    super();
  }

  public checkName() {
    if (!this.name) {
      throw new InvalidName();
    }
    if (!this.name.includes(" ")) {
      throw new InvalidName();
    }
    const nameRegex: RegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (!nameRegex.test(this.name)) {
      throw new InvalidName();
    }
    if (this.name.length < 5) {
      throw new InvalidName();
    }
    const numberAndSpaceRegex: RegExp = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/u;
    if (!numberAndSpaceRegex.test(this.name)) {
      throw new InvalidName();
    }
    return this;
  }

  public checkClosedContracts() {
    if (!Array.isArray(this.closedContracts)) {
      throw new ClosedContractsArray();
    }

    if (this.closedContracts?.length !== 0) {
      this.closedContracts.forEach((contract) => {
        if (!contract.plan) {
          throw new InvalidPlan();
        }
        CommonDomain.checkDate(contract.ended);
      });
    }
    return this;
  }

  public checkCurrentContract() {
 
    if(isNaN(this.currentContract.availableClasses as number) && this.currentContract.availableClasses !== "---"){
        throw new InvalidClassString()
    }
    
    if (!isNaN(this.currentContract.availableClasses as number) && this.currentContract.availableClasses < 0) {
      throw new InvalidClassQuantity();
    }

    if (!this.currentContract.plan) {
      throw new InvalidPlan();
    }

    if (typeof this.currentContract.active !== "boolean") {
      throw new ActiveIsNotBoolean();
    }

    CommonDomain.checkDate(this.currentContract.ends);
    CommonDomain.checkDate(this.currentContract.started);

    if (
      !CommonDomain.compareDates(
        this.currentContract.started,
        this.currentContract.ends
      )
    ) {
      throw new IncompatibleDates();
    }

    return this;
  }

  public static toContract(obj: any): Contract {
    const result = new Contract(
      obj.id,
      obj.name,
      obj.closedContracts,
      obj.currentContract
    );
    return result;
  }
}
