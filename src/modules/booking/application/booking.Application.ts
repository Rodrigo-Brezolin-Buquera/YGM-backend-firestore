import { Checkin } from "../domain/booking.Entity";
import {
  CreateCheckinDTO,
  CheckinIdDTO,
  ValidateCheckinDTO,
  FindCheckinDTO,
  CheckinTokenDTO,
} from "../domain/booking.DTO";
import { BookingRepository } from "./booking.Repository";
import { ENTITY, PLAN } from "../domain/booking.Types";

import {
  DoubleCheckin,
  NoAvailableClasses,
  NoCapacityInClass,
} from "../../../common/customError/conflicts";
import { InvalidEntity } from "../../../common/customError/invalidRequests";
import { ITokenService } from "../../../common/aplication/common.ports";
import { IBookingRequestSerive } from "./booking.ports";

export class BookingApplication {
  constructor(
    private bookingInfrastructure: BookingRepository,
    private tokenService: ITokenService,
    private requestService: IBookingRequestSerive
  ) {}

  public async findCheckin(input: FindCheckinDTO): Promise<Checkin[]> {
    let { id, entity, token } = input;
    this.tokenService.verifyUserPermission(token);
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

  public async findUserCheckins({
    token,
  }: CheckinTokenDTO): Promise<Checkin[]> {
    const id = this.tokenService.getTokenId(token);
    const checkins = await this.bookingInfrastructure.findById(
      id,
      "contractId"
    );
    return checkins;
  }

  public async createCheckin(input: CreateCheckinDTO): Promise<void> {
    const { contractId, yogaClassId, token } = input;
    this.tokenService.verifyUserPermission(token);
    const checkinId = `${contractId}+${yogaClassId}`;

    const { currentContract, name } = await this.requestService.requestContract(
      token
    );
    const yogaClass = await this.requestService.requestYogaClass(
      yogaClassId,
      token
    );

    const availableClassesDontApply =
      currentContract.plan === PLAN.SINGLE || currentContract.plan === PLAN.APP;

    if (!availableClassesDontApply && currentContract.availableClasses <= 0) {
      throw new NoAvailableClasses();
    }

    if (yogaClass.capacity <= 0) {
      throw new NoCapacityInClass();
    }

    const checkinExists = await this.bookingInfrastructure.findCheckinById(
      checkinId
    );

    if (checkinExists) {
      throw new DoubleCheckin();
    }

    const newCheckin = Checkin.toCheckin({
      id: checkinId,
      name,
      date: yogaClass.date,
      yogaClassId,
      contractId,
      verified: false,
    });

    newCheckin.checkName();
    Checkin.checkDate(yogaClass.date);

    const changeClassesRequest =
    availableClassesDontApply || await this.requestService.requestChangeClass(
      contractId,
      "subtract",
      token
    )

    await Promise.all([
      await this.bookingInfrastructure.createCheckin(newCheckin),
      changeClassesRequest,
      await this.requestService.requestChangeCapacity(
        yogaClassId,
        "subtract",
        token
      ),
    ]);
  }

  public async validateCheckin(input: ValidateCheckinDTO): Promise<void> {
    const { checkinId, verified, token } = input;
    this.tokenService.verifyUserPermission(token);
    Checkin.checkId(checkinId);

    await this.bookingInfrastructure.validateCheckin(checkinId, verified);
  }

  public async deleteCheckin({ id, token }: CheckinIdDTO): Promise<void> {
    this.tokenService.verifyUserPermission(token);
    Checkin.checkId(id);
    const [contractId, yogaClassId] = id.split("+");

    const { currentContract } = await this.requestService.requestContract(
      token
    );
    const availableClassesDontApply =
      currentContract.plan === PLAN.SINGLE || currentContract.plan === PLAN.APP;
      
    const changeClassesRequest =
      availableClassesDontApply ||
      (await this.requestService.requestChangeClass(contractId, "add", token));

    await Promise.all([
      await this.bookingInfrastructure.deleteCheckin(id),
      changeClassesRequest,
      await this.requestService.requestChangeCapacity(
        yogaClassId,
        "add",
        token
      ),
    ]);
  }

  public async deleteAllCheckinByContract({
    id,
    token,
  }: CheckinIdDTO): Promise<void> {
    this.tokenService.verifyAdminPermission(token);
    Checkin.checkId(id);

    await this.bookingInfrastructure.deleteAllCheckinByContract(id);
  }
}
