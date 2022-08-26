import { Checkin } from "../domain/booking.Entity";
import {
  CreateCheckinDTO,
  CheckinIdDTO,
  ValidateCheckinDTO,
  FindCheckinDTO,
} from "../domain/booking.DTO";
import { BookingRepository } from "./booking.Repository";
import { ENTITY } from "../domain/booking.Types";
import {
  requestChangeClass,
  requestContract,
  requestYogaClass,
} from "./booking.request.service";
import {
  DoubleCheckin,
  NoAvailableClasses,
} from "../../../common/customError/conflicts";
import { InvalidEntity } from "../../../common/customError/invalidRequests";

export class BookingApplication {
  constructor(private bookingInfrastructure: BookingRepository) {}

  public async findCheckin(input: FindCheckinDTO): Promise<Checkin[]> {
    let { id, entity, token } = input;
    Checkin.verifyUserPermission(token);
    Checkin.checkId(id);

    if (entity === ENTITY.CONTRACT) {
      entity = "contractId";
    } else if (entity === ENTITY.YOGACLASS) {
      entity = "yogaClassId";
    } else {
      throw new InvalidEntity();
    }

    const checkins = await this.bookingInfrastructure.findById(id, entity);
    return checkins;
  }

  public async createCheckin(input: CreateCheckinDTO): Promise<void> {
    const { contractId, yogaClassId, token } = input;
    Checkin.verifyUserPermission(token);
    const checkinId = `${contractId}+${yogaClassId}`;

    const contract = await requestContract(token);
    const yogaClass = await requestYogaClass(yogaClassId, token);

    if (contract.currentContract.availableClasses <= 0) {
      throw new NoAvailableClasses();
    }

    const checkinExists = await this.bookingInfrastructure.findCheckinById(
      checkinId
    );

    if (checkinExists) {
      throw new DoubleCheckin();
    }

    const newCheckin = new Checkin(
      checkinId,
      contract.name,
      yogaClass.date,
      yogaClassId,
      contractId
    );

    newCheckin.checkName();
    Checkin.isValidDate(yogaClass.date);

    await this.bookingInfrastructure.createCheckin(newCheckin);

    await requestChangeClass(contract.id, "subtract", token);
  }

  public async validateCheckin(input: ValidateCheckinDTO): Promise<void> {
    const { checkinId, verified, token } = input;
    Checkin.verifyUserPermission(token);
   // ver direito essa bagaça
    Checkin.checkId(checkinId);

    await this.bookingInfrastructure.validateCheckin(checkinId, verified);
  }

  public async deleteCheckin({ id, token }: CheckinIdDTO): Promise<void> {
    Checkin.verifyUserPermission(token);
    Checkin.checkId(id);
    const [contractId] = id.split("+");

    await this.bookingInfrastructure.deleteCheckin(id);
    await requestChangeClass(contractId, "add", token);
  }

  public async deleteAllCheckinByContract({
    id,
    token,
  }: CheckinIdDTO): Promise<void> {
    Checkin.verifyAdminPermission(token);
    Checkin.checkId(id);

    await this.bookingInfrastructure.deleteAllCheckinByContract(id);
  }
}
