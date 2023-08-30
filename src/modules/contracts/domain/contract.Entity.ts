
import { Plan } from "../../../common/domain/common.enum";
import { validateName } from "../../../common/domain/common.validations";

export class Contract  {
  constructor(
    private id: string,
    private name: string,
    private plan: Plan,
    private started: string,
    private ends: string,
    private availableClasses: number 
  ) {
  }

  public checkName() {
    validateName(this.name)
  }

 

  // public checkCurrentContract() {
 
  //   if(isNaN(this.currentContract.availableClasses as number) && this.currentContract.availableClasses !== "---"){
  //       throw new InvalidClassString()
  //   }
    
  //   if (!isNaN(this.currentContract.availableClasses as number) && this.currentContract.availableClasses < 0) {
  //     throw new InvalidClassQuantity();
  //   }

  //   if (!this.currentContract.plan) {
  //     throw new InvalidPlan();
  //   }

  //   if (typeof this.currentContract.active !== "boolean") {
  //     throw new ActiveIsNotBoolean();
  //   }

  //   CommonDomain.checkDate(this.currentContract.ends);
  //   CommonDomain.checkDate(this.currentContract.started);

  //   if (
  //     !CommonDomain.compareDates(
  //       this.currentContract.started,
  //       this.currentContract.ends
  //     )
  //   ) {
  //     throw new IncompatibleDates();
  //   }

  //   return this;
  // }

  public static toModel(obj: any): Contract {
    const result = new Contract(
      obj.id,
      obj.name,
      obj.plan,
      obj.started,
      obj.ends,
      obj.availableClasses
    );
    return result;
  }
}
