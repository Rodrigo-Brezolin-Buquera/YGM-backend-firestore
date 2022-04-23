import { CustomError } from "../../../common/customError/customError";
import { Checkin } from "../domain/booking.Entity";
import {
  CreateCheckinDTO,
  CheckinIdDTO,
  ValidateCheckinDTO,
  CheckinDTO,
} from "../domain/booking.DTO";
import { BookingRepository } from "./booking.Repository";
import {
  addCheckinToList,
  editCheckinFromList,
  removeCheckinFromList,
} from "./booking.CheckinList.service";
import { Contract, YogaClass } from "../domain/booking.Types";

export class BookingApplication {
  constructor(
    private bookingContractService: BookingRepository,
    private bookingYogaClassService: BookingRepository,
    ) {}

  public async createCheckin({
    contractId,
    yogaClassId,
  }: CreateCheckinDTO): Promise<void> {
    try {
      const checkinId = `${contractId}+${yogaClassId}`;
      const {contract, yogaClass } = await this.findContractAndYogaClass(checkinId)

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

      const {contractCheckins, yogaClassCheckins} = addCheckinToList(
        contract.currentContract.checkins,
        yogaClass.checkins,
        newCheckin
      )

      await this.changeCheckinsList(
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
      const {contract, yogaClass } = await this.findContractAndYogaClass(checkinId)

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

      const {contractCheckins, yogaClassCheckins} = editCheckinFromList(
        contract.currentContract.checkins,
        yogaClass.checkins,
        newCheckin
      )

      await this.changeCheckinsList(
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
      const {contract, yogaClass } = await this.findContractAndYogaClass(checkinId)

      const {contractCheckins, yogaClassCheckins} = removeCheckinFromList(
        contract.currentContract.checkins,
        yogaClass.checkins,
        checkinId
      )

      await this.changeCheckinsList(
        contractCheckins,
        yogaClassCheckins,
        checkinId
      );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findContractAndYogaClass( checkinId : string): Promise<CheckinDTO> { 
    try {
      const [contractId, yogaClassId] = checkinId.split("+");

      const contract = (await this.bookingContractService.findByIdWith(
        contractId
      )) as Contract;
      const yogaClass = (await this.bookingYogaClassService.findByIdWith(
        yogaClassId
      )) as YogaClass;

     return {contract, yogaClass}
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async changeCheckinsList(
    contractCheckins: Checkin[],
    yogaClassCheckins: Checkin[], 
    checkinId: string
  ): Promise<void> {  
    try {
      const [contractId, yogaClassId] = checkinId.split("+");

      await this.bookingContractService.changeCheckinsList(
        contractCheckins,
        contractId
      );
      await this.bookingYogaClassService.changeCheckinsList(
        yogaClassCheckins,
        yogaClassId
      );

    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
