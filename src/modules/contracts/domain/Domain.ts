import { compare } from "bcryptjs";
import { CustomError } from "../../../common/customError/customError";
import { compareDates, isValidDate } from "../../../common/services/moment";
import { ClosedContracts, CurrentContract } from "./Types";

export class Contract {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly closedContracts: ClosedContracts[],
    public readonly currentContract: CurrentContract
  ) {}

  public checkId() {
    if (!this.id) {
      throw CustomError.invalidRequest;
    }
    return this;
  }

  public checkName() {
    if (!this.name) {
      throw CustomError.invalidRequest;
    }

    if (this.name.length < 5) {
      throw CustomError.invalidName();
    }
    if (!this.name.includes(" ")) {
      throw CustomError.invalidName();
    }
    return this;
  }

  public checkClosedContracts() {
    if (this.closedContracts.length !== 0) {
      this.closedContracts.forEach((contract) => {
        if (!contract.plan) {
          throw new CustomError("plano inválido", 400);
        }

        isValidDate(contract.ended);
      });
    }
    return this;
  }

  public checkCurrentContract() {
    if (this.currentContract.availableClasses < 0) {
      throw CustomError.invalidClassQuantity();
    }

    if (!this.currentContract.plan) {
      throw new CustomError("Plano inválido", 400);
    }
    isValidDate(this.currentContract.ends);
    isValidDate(this.currentContract.started);

    if (
      !compareDates(this.currentContract.started, this.currentContract.ends)
    ) {
      throw CustomError.incompatibleDates();
    }

    if (this.currentContract.checkins.length !== 0) {
      this.currentContract.checkins.forEach((checkin) => {
        if (!checkin.id) {
          throw new CustomError("Check-in sem id", 400);
        }
      });
    }
    return this;
  }
}
