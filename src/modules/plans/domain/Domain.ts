import {
  FrequencyError,
  InvalidRequest,
} from "../../../common/customError/customError";
import { FREQUENCY, TYPE } from "./Types";

export class Plan {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly frequency: string,
    public readonly availableClasses: number,
    public readonly durationInMonths: number
  ) {}

  public checkType(type: string) {
    if (!type) {
      throw new InvalidRequest();
    }
    if (
      type !== TYPE.MONTHLY &&
      type !== TYPE.QUARTERLY &&
      type !== TYPE.SEMIANNUAL &&
      type !== TYPE.SINGLE &&
      type !== TYPE.APP
    ) {
      throw new TypeError();
    }

    return this;
  }

  public checkFrequency(frequency: string) {
    if (!frequency) {
      throw new InvalidRequest();
    }
    if (
      frequency !== FREQUENCY.ONE &&
      frequency !== FREQUENCY.TWO &&
      frequency !== FREQUENCY.THREE &&
      frequency !== FREQUENCY.NONE
    ) {
      throw new FrequencyError();
    }
    return this;
  }

  public checkDuration(duration: number) {
    if (!duration || duration <= 0) {
      throw new InvalidRequest();
    }
    return this;
  }

  public checkClasses(classes: number) {
    if (!classes || classes <= 0) {
      throw new InvalidRequest();
    }
    return this;
  }
}
