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
    const { contractId, yogaClassId, token } = input;
    Checkin.verifyUserPermission(token);
    Checkin.checkEmptyInput(input);
    const checkinId = `${contractId.trim()}+${yogaClassId.trim()}`;

    const contract = (await this.bookingContractService.findByIdWith(
      contractId
    )) as Contract;
    const yogaClass = (await this.bookingYogaClassService.findByIdWith(
      yogaClassId
    )) as YogaClass;

    verifyIfCheckinExists(contract.currentContract.checkins, checkinId);

    const newCheckin = new Checkin(
      checkinId,
      false,
      contract.name.trim(),
      yogaClass.date.trim()
    );

    newCheckin.checkName();
    Checkin.isValidDate(yogaClass.date);

    const { contractCheckins, yogaClassCheckins } = addCheckinToList(
      contract.currentContract.checkins,
      yogaClass.checkins!,
      newCheckin
    );

    contract.currentContract.checkins = contractCheckins; //
    contract.currentContract.availableClasses -= 1; // precisa fazer validação!!
    await this.bookingContractService.changeCheckinsList(
      contract.currentContract,
      contractId
    );
    await this.bookingYogaClassService.changeCheckinsList(
      yogaClassCheckins,
      yogaClassId
    );
  }

  public async validateCheckin(input: ValidateCheckinDTO): Promise<void> {
    const { checkinId, verified, token } = input;
    Checkin.verifyUserPermission(token);
    Checkin.checkEmptyInput(input);
    const [contractId, yogaClassId] = checkinId.trim().split("+");

    const contract = (await this.bookingContractService.findByIdWith(
      contractId
    )) as Contract;
    const yogaClass = (await this.bookingYogaClassService.findByIdWith(
      yogaClassId
    )) as YogaClass;

    const newCheckin = new Checkin(
      checkinId,
      verified,
      contract.name.trim(),
      yogaClass.date.trim()
    );

    newCheckin.checkName().checkVerified();
    Checkin.checkId(contractId);
    Checkin.checkId(yogaClassId);
    Checkin.isValidDate(yogaClass.date.trim());

    const { contractCheckins, yogaClassCheckins } = editCheckinFromList(
      contract.currentContract.checkins,
      yogaClass.checkins!,
      newCheckin
    );

    contract.currentContract.checkins = contractCheckins;
    await this.bookingContractService.changeCheckinsList(
      contract.currentContract,
      contractId
    );
    await this.bookingYogaClassService.changeCheckinsList(
      yogaClassCheckins,
      yogaClassId
    );
  }

  public async deleteCheckin({
    checkinId,
    token,
  }: CheckinIdDTO): Promise<void> {
    Checkin.verifyUserPermission(token);
    Checkin.checkId(checkinId);
    const [contractId, yogaClassId] = checkinId.trim().split("+");

    const contract = (await this.bookingContractService.findByIdWith(
      contractId
    )) as Contract;
    const yogaClass = (await this.bookingYogaClassService.findByIdWith(
      yogaClassId
    )) as YogaClass;

    const { contractCheckins, yogaClassCheckins } = removeCheckinFromList(
      contract.currentContract.checkins,
      yogaClass.checkins!,
      checkinId
    );

    contract.currentContract.checkins = contractCheckins;
    contract.currentContract.availableClasses += 1;
    await this.bookingContractService.changeCheckinsList(
      contract.currentContract,
      contractId
    );
    await this.bookingYogaClassService.changeCheckinsList(
      yogaClassCheckins,
      yogaClassId
    );
  }
}
