import { CustomError } from "../../../common/customError/customError";
import { Checkin } from "../domain/booking.Entity";
import {
  CreateCheckinDTO,
  CheckinIdDTO,
  ValidateCheckinDTO,
} from "../domain/booking.DTO";
import { BookingRepository } from "./booking.Repository";
import {
  addCheckinToList,
  editCheckinFromList,
  removeCheckinFromList,
  verifyIfCheckinExists,
} from "./booking.CheckinList.service";
import { Contract, YogaClass } from "../domain/booking.Types";

export class BookingApplication {
  constructor(
    private bookingContractService: BookingRepository,
    private bookingYogaClassService: BookingRepository
  ) {}

  public async createCheckin(input: CreateCheckinDTO): Promise<void> {
    try {
      const { contractId, yogaClassId, token } = input;
      Checkin.verifyUserPermission(token);
      const checkinId = `${contractId}+${yogaClassId}`;

      const contract = (await this.bookingContractService.findByIdWith(contractId)) as Contract;
      const yogaClass = (await this.bookingYogaClassService.findByIdWith(yogaClassId)) as YogaClass;

      verifyIfCheckinExists(contract.currentContract.checkins, checkinId);

      const newCheckin = new Checkin(
        checkinId,
        false,
        contract.name,
        yogaClass.date
      );

      newCheckin
        .checkId(contractId)
        .checkId(yogaClassId)
        .checkId(checkinId)
        .checkName();

      Checkin.isValidDate(yogaClass.date);

      const { contractCheckins, yogaClassCheckins } = addCheckinToList(
        contract.currentContract.checkins,
        yogaClass.checkins,
        newCheckin
      );

      await this.bookingContractService.changeCheckinsList(contractCheckins, contractId );
      await this.bookingYogaClassService.changeCheckinsList(yogaClassCheckins,yogaClassId);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async validateCheckin(input: ValidateCheckinDTO): Promise<void> {
    try {
      const { checkinId, verified, token } = input;
      Checkin.verifyUserPermission(token)
      const [contractId, yogaClassId] = checkinId.split("+");
      const contract = (await this.bookingContractService.findByIdWith(contractId)) as Contract;
      const yogaClass = (await this.bookingYogaClassService.findByIdWith(yogaClassId)) as YogaClass;

      const newCheckin = new Checkin(
        checkinId,
        verified,
        contract.name,
        yogaClass.date
      );

      newCheckin
        .checkId(contractId)
        .checkId(yogaClassId)
        .checkId(checkinId)
        .checkName();

      Checkin.isValidDate(yogaClass.date);

      const { contractCheckins, yogaClassCheckins } = editCheckinFromList(
        contract.currentContract.checkins,
        yogaClass.checkins,
        newCheckin
      );

      await this.bookingContractService.changeCheckinsList(contractCheckins, contractId );
      await this.bookingYogaClassService.changeCheckinsList(yogaClassCheckins, yogaClassId);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteCheckin({ checkinId, token }: CheckinIdDTO): Promise<void> {
    try {
      Checkin.verifyUserPermission(token)
      const [contractId, yogaClassId] = checkinId.split("+");
      const contract = (await this.bookingContractService.findByIdWith(contractId)) as Contract;
      const yogaClass = (await this.bookingYogaClassService.findByIdWith(yogaClassId)) as YogaClass;

      const { contractCheckins, yogaClassCheckins } = removeCheckinFromList(
        contract.currentContract.checkins,
        yogaClass.checkins,
        checkinId
      );

      await this.bookingContractService.changeCheckinsList(contractCheckins, contractId);
      await this.bookingYogaClassService.changeCheckinsList( yogaClassCheckins, yogaClassId);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
