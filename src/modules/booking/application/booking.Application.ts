import { Checkin } from "../domain/booking.Entity";
import {
  CreateCheckinDTO,
  CheckinIdDTO,
  ValidateCheckinDTO,
  FindCheckinDTO,
} from "../domain/booking.DTO";
import { BookingRepository } from "./booking.Repository";
import { Contract, ENTITY, YogaClass } from "../domain/booking.Types";
import { requestContract, requestYogaClass } from "./booking.request.service";
import { DoubleCheckin } from "../../../common/customError/conflicts";
import { InvalidEntity } from "../../../common/customError/invalidRequests";

export class BookingApplication {
  constructor(private bookingInfrastructure: BookingRepository) {}

  public async findCheckin(input: FindCheckinDTO): Promise<Checkin[]> {
    let { id, entity, token } = input;
    Checkin.verifyUserPermission(token);
    Checkin.checkEmptyInput(input); // ver direito essa bagaça
    Checkin.checkId(id);

    if (entity === ENTITY.CONTRACT) {
      entity = "contractId"
    } else if (entity === ENTITY.YOGACLASS) {
      entity = "yogaClassId"
    } else {
      throw new InvalidEntity()
    }

    const checkins = await this.bookingInfrastructure.findById(id, entity )
    return checkins
  }


  public async createCheckin(input: CreateCheckinDTO): Promise<void> {
    const { contractId, yogaClassId, token } = input;
    Checkin.verifyUserPermission(token);
    Checkin.checkEmptyInput(input);
    const checkinId = `${contractId.trim()}+${yogaClassId.trim()}`;

    const contract = await requestContract(contractId);
    const yogaClass = await requestYogaClass(yogaClassId);

    const checkinExists = await this.bookingInfrastructure.findCheckinById(
      checkinId
    );

    if (checkinExists) {
      throw new DoubleCheckin();
    }

    const newCheckin = new Checkin(
      checkinId,
      contract.name.trim(),
      yogaClass.date.trim(),
      yogaClassId.trim(),
      contractId.trim()
    );

    newCheckin.checkName();
    Checkin.isValidDate(yogaClass.date);

    await this.bookingInfrastructure.createCheckin(newCheckin);
  }

  public async validateCheckin(input: ValidateCheckinDTO): Promise<void> {
    const { checkinId, verified, token } = input;
    Checkin.verifyUserPermission(token);
    Checkin.checkEmptyInput(input); // ver direito essa bagaça
    Checkin.checkId(checkinId);

    await this.bookingInfrastructure.validateCheckin(checkinId, verified);
  }

  public async deleteCheckin({
    id,
    token,
    allCheckins,
  }: CheckinIdDTO): Promise<void> {
    Checkin.verifyUserPermission(token);
    Checkin.checkId(id);

    allCheckins
      ? await this.bookingInfrastructure.deleteAllCheckinByContract(id)
      : await this.bookingInfrastructure.deleteCheckin(id);
  }
}
