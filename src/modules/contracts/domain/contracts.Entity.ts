import {
  ActiveIsNotBoolean,
  CheckinsArray,
  ClosedContractsArray,
  IncompatibleDates,
} from "../../../common/customError/conflicts";
import { CustomError } from "../../../common/customError/customError";
import {
  InvalidClassQuantity,
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
    try {
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
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  public checkClosedContracts() {
    try {
      if (!Array.isArray(this.closedContracts)) {
        throw new ClosedContractsArray();
      }

      if (this.closedContracts.length !== 0) {
        this.closedContracts.forEach((contract) => {
          if (!contract.plan) {
            throw new InvalidPlan();
          }
          CommonDomain.isValidDate(contract.ended);
        });
      }
      return this;
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  public checkCurrentContract() {
    try {
      if (isNaN(this.currentContract.availableClasses)) {
        throw new InvalidClassQuantity();
      }

      if (this.currentContract.availableClasses < 0) {
        throw new InvalidClassQuantity();
      }

      if (!this.currentContract.plan) {
        throw new InvalidPlan();
      }

      if (typeof this.currentContract.active !== "boolean") {
        throw new ActiveIsNotBoolean();
      }

      CommonDomain.isValidDate(this.currentContract.ends);
      CommonDomain.isValidDate(this.currentContract.started);

      if (
        !CommonDomain.compareDates(
          this.currentContract.ends,
          this.currentContract.started
        )
      ) {
        throw new IncompatibleDates();
      }

      if (!Array.isArray(this.currentContract.checkins)) {
        throw new CheckinsArray();
      }

      if (this.currentContract.checkins.length !== 0) {
        this.currentContract.checkins.forEach((checkin) => {
          throw CommonDomain.checkId(checkin.id);
        });
      }
      return this;
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  }
}
