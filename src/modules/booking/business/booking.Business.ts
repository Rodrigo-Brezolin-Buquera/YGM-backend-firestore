import { Checkin } from "../domain/booking.Entity";
import { BookingRepository } from "./booking.Repository";
import { InvalidEntity } from "../../../common/customError/invalidRequests";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { DeleteDTO } from "../domain/DTOs/booking.delete.dto";
import { FindCheckinDTO } from "../domain/DTOs/booking.getByEntity.dto";

export class BookingBusiness {
  constructor(
    private bookingDB: BookingRepository
  
  ) {}
  public async findCheckin({id}: IdDTO): Promise<Checkin | null> { 
    return this.bookingDB.findCheckin(id)
  }

  public async findUserCheckin({id}: IdDTO): Promise<Checkin[]> { 
    return this.bookingDB.findByEntity(id, "contractId")
  }

  public async findByEntity(input: FindCheckinDTO): Promise<Checkin[]> {
    let { id, entity } = input;
  
    if (entity === "contract") {
      entity = "contractId";
    } else if ("class") {
      entity = "yogaClassId";
    } else {
      throw new InvalidEntity();
    }

    return await this.bookingDB.findByEntity(id, entity);
  }

  
  // public async createCheckin(input: CreateCheckinDTO): Promise<void> {
  //   const { contractId, yogaClassId, token } = input;
  //   const checkinId = `${contractId}+${yogaClassId}`;

  //   const availableClassesDontApply =
  //     currentContract.plan === PLAN.SINGLE || currentContract.plan === PLAN.APP;

  //   if (!availableClassesDontApply && currentContract.availableClasses <= 0) {
  //     throw new NoAvailableClasses();
  //   }

  //   if (yogaClass.capacity <= 0) {
  //     throw new NoCapacityInClass();
  //   }

  //   const checkinExists = await this.bookingDB.findCheckinById(
  //     checkinId
  //   );

  //   if (checkinExists) {
  //     throw new DoubleCheckin();
  //   }

  //   const newCheckin = Checkin.toCheckin({
  //     id: checkinId,
  //     name,
  //     date: yogaClass.date,
  //     yogaClassId,
  //     contractId,
  //     verified: false,
  //   });

  //     await this.bookingDB.createCheckin(newCheckin),
      
  // }

 

  public async deleteCheckin({ id, type }: DeleteDTO): Promise<void> {
    const [contractId, yogaClassId] = id.split("+");

    switch (type) {
      case "contract":
        await this.bookingDB.deleteCheckin(id)
        // add capacidade de aula
        // add aula diponivil no contrato
        break;
      case "single":
      default:
        await this.bookingDB.deleteCheckin(id)
        break;
    }
  }


}