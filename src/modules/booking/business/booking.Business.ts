import { Checkin } from "../domain/booking.Entity";
import { BookingRepository } from "./booking.Repository";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { DeleteDTO } from "../domain/DTOs/booking.delete.dto";
import { FindCheckinDTO } from "../domain/DTOs/booking.getByEntity.dto";
import {
  ChangeEntity,
  UpdateAction,
} from "../domain/DTOs/booking.changeEntity.dto";
import { CreateCheckinDTO } from "../domain/DTOs/booking.create.dto";
import { CustomError } from "../../../common/customError/customError";
import { CreateSingleDTO } from "../domain/DTOs/booking.createSingle.dto";
import { formatDate } from "../../../common/utils/common.utils.formatDate";

export class BookingBusiness {
  constructor(private bookingDB: BookingRepository) {}
  public async findCheckin({ id }: IdDTO): Promise<Checkin | null> {
    return this.bookingDB.findCheckin(id);
  }

  public async findByEntity(input: FindCheckinDTO): Promise<Checkin[]> {
    const { id } = input;
    let { entity, limit } = input;

    if (entity === "contract") {
      entity = "contractId";
      limit = limit ?? 5;
    } else if (entity === "class") {
      entity = "yogaClassId";
      limit = limit ?? 20;
    } else {
      throw new CustomError("A entidade precisa ser contract ou class", 400);
    }

    return await this.bookingDB.findByEntity(id, entity, limit);
  }

  public async createCheckin(input: CreateCheckinDTO): Promise<void> {
    const { contractId, yogaClassId, date } = input;
    const id = `${contractId}+${yogaClassId}`;

    const checkinExists = await this.bookingDB.findCheckin(id);
    if (checkinExists) {
      throw new CustomError("Checkin já realizado", 406);
    }

    const formatedDate = formatDate(date);
    const newCheckin = Checkin.toModel({ ...input, date: formatedDate, id });
    const classAction: ChangeEntity = {
      key: "capacity",
      value: UpdateAction.SUBTRACT,
      collection: "calendar",
    };
    const contractAction: ChangeEntity = {
      key: "availableClasses",
      value: UpdateAction.SUBTRACT,
      collection: "contracts",
    };

    await this.bookingDB.changeEntity(contractId, contractAction);
    await this.bookingDB.changeEntity(yogaClassId, classAction);
    await this.bookingDB.createCheckin(newCheckin);
  }

  public async createSingleCheckin(input: CreateSingleDTO): Promise<void> {
    const { name, yogaClassId, date } = input;
    const id = `${name}+${yogaClassId}`;

    const checkinExists = await this.bookingDB.findCheckin(id);
    if (checkinExists) {
      throw new CustomError("Checkin já realizado", 406);
    }
    const formatedDate = formatDate(date);

    const newCheckin = Checkin.toModel({
      ...input,
      id,
      date: formatedDate,
      contractId: "none",
    });
    const classAction: ChangeEntity = {
      key: "capacity",
      value: UpdateAction.SUBTRACT,
      collection: "calendar",
    };
    await this.bookingDB.changeEntity(yogaClassId, classAction);
    await this.bookingDB.createCheckin(newCheckin);
  }

  public async deleteCheckin({ id, type }: DeleteDTO): Promise<void> {
    const [contractId, yogaClassId] = id.split("+");

    if (!contractId || !yogaClassId) {
      throw new CustomError("Entre com id de checkin válido", 400);
    }

    const classAction: ChangeEntity = {
      key: "capacity",
      value: UpdateAction.ADD,
      collection: "calendar",
    };

    if (type === "single") {
      await this.bookingDB.changeEntity(yogaClassId, classAction);
      await this.bookingDB.deleteCheckin(id);

    } else {
      const contractAction: ChangeEntity = {
        key: "availableClasses",
        value: UpdateAction.ADD,
        collection: "contracts",
      };
     
      await this.bookingDB.changeEntity(contractId, contractAction);
      await this.bookingDB.changeEntity(yogaClassId, classAction);
      await this.bookingDB.deleteCheckin(id);
    }
  }
}
