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
} from "./booking.CheckinList.service";

export class BookingApplication {
  constructor(private bookingInfrastructure: BookingRepository) {}

  public async createCheckin({
    contractId,
    yogaClassId,
  }: CreateCheckinDTO): Promise<void> {
    try {
      const checkinId = `${contractId}+${yogaClassId}`;

      const contract = await this.bookingInfrastructure.findContract(
        contractId
      );
      const yogaClass = await this.bookingInfrastructure.findClass(yogaClassId);

      const verifyCheckin = contract.currentContract.checkins.findIndex(
        (item) => item.id === checkinId
      );
      if (verifyCheckin !== -1) {
        CustomError.doubleCheckin();
      }

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

      const contractCheckins = addCheckinToList(contract.currentContract.checkins,newCheckin);
      const yogaClassCheckins = addCheckinToList(yogaClass.checkins, newCheckin);

      await this.bookingInfrastructure.changeCheckinsList(
        contractCheckins,
        yogaClassCheckins,
        checkinId
      );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async validateCheckin({
    checkinId,
    verified,
  }: ValidateCheckinDTO): Promise<void> {
    try {
      const [contractId, yogaClassId] = checkinId.split("+");

      const contract = await this.bookingInfrastructure.findContract(
        contractId
      );
      const yogaClass = await this.bookingInfrastructure.findClass(yogaClassId);

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

      let contractCheckins = editCheckinFromList(contract.currentContract.checkins, newCheckin)
      let yogaClassCheckins = editCheckinFromList(yogaClass.checkins, newCheckin)

      await this.bookingInfrastructure.changeCheckinsList(
        contractCheckins,
        yogaClassCheckins,
        checkinId
      );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteCheckin({ checkinId }: CheckinIdDTO): Promise<void> {
    try {
      const [contractId, yogaClassId] = checkinId.split("+");

      const contract = await this.bookingInfrastructure.findContract(contractId);
      const yogaClass = await this.bookingInfrastructure.findClass(yogaClassId);

      let contractCheckins = removeCheckinFromList(contract.currentContract.checkins,checkinId);
      let yogaClassCheckins = removeCheckinFromList(yogaClass.checkins, checkinId);

      await this.bookingInfrastructure.changeCheckinsList(
        contractCheckins,
        yogaClassCheckins,
        checkinId
      );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
