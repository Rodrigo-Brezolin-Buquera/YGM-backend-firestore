import { CustomError } from "../../../common/customError/customError";
import { Checkin } from "../domain/Domain";
import {
  CreateCheckinDTO,
  CheckinIdDTO,
  ValidateCheckinDTO,
} from "../domain/Types";
import { BookingRepository } from "./Repository";

// import { transporter } from "../../../common/services/mailTransporter";

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
        .checkName()
        .checkDate();

      const contractCheckins = contract.currentContract.checkins;
      contractCheckins.push(newCheckin);

      const yogaClassCheckins = yogaClass.checkins;
      yogaClassCheckins.push(newCheckin);

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
        .checkName()
        .checkDate();

      let contractCheckins = contract.currentContract.checkins;
      contractCheckins = contractCheckins.filter(
        (checkin) => checkin.id !== newCheckin.id
      );
      contractCheckins.push(newCheckin);

      let yogaClassCheckins = yogaClass.checkins;
      yogaClassCheckins = yogaClassCheckins.filter(
        (checkin) => checkin.id !== newCheckin.id
      );
      yogaClassCheckins.push(newCheckin);

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

      const contract = await this.bookingInfrastructure.findContract(
        contractId
      );
      const yogaClass = await this.bookingInfrastructure.findClass(yogaClassId);

      let contractCheckins = contract.currentContract.checkins;
      contractCheckins = contractCheckins.filter(
        (checkin) => checkin.id !== checkinId
      );

      let yogaClassCheckins = yogaClass.checkins;
      yogaClassCheckins = yogaClassCheckins.filter(
        (checkin) => checkin.id !== checkinId
      );

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
