import { Checkin } from "../domain/booking.Entity";
import { BookingRepository } from "./booking.Repository";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { DeleteDTO } from "../domain/DTOs/booking.delete.dto";
import { FindCheckinDTO } from "../domain/DTOs/booking.getByEntity.dto";
import { FindUserCheckinsDTO } from "../domain/DTOs/booking.findUserCheckin.dto";
import { ChangeEntity, UpdateAction } from "../domain/DTOs/booking.changeEntity.dto";
import { CreateCheckinDTO } from "../domain/DTOs/booking.create.dto";
import { CustomError } from "../../../common/customError/customError";
import { CreateSingleDTO } from "../domain/DTOs/booking.createSingle.dto";

export class BookingBusiness {
    constructor(private bookingDB: BookingRepository) {}
    public async findCheckin({ id }: IdDTO): Promise<Checkin | null> {
        return this.bookingDB.findCheckin(id);
    }

    public async findUserCheckin(input: FindUserCheckinsDTO): Promise<Checkin[]> {
        let { id, limit } = input;
        limit = limit ?? 5;
        return this.bookingDB.findByEntity(id, "contractId", limit);
    }

    public async findByEntity(input: FindCheckinDTO): Promise<Checkin[]> {
        let { id, entity, limit } = input;

        if (entity === "contract") {
            entity = "contractId";
            limit = limit ?? 5;
        } else if (entity === "class") {
            entity = "yogaClassId";
            limit = limit ?? 20;
        } else {
            throw new CustomError("A entidade precisa ser contract ou class");
        }

        return await this.bookingDB.findByEntity(id, entity, limit);
    }

    public async createCheckin(input: CreateCheckinDTO): Promise<void> {
        const { contractId, yogaClassId,  type} = input;
        const id = `${contractId}+${yogaClassId}`;

        const checkinExists = await this.bookingDB.findCheckin(id);
        if (checkinExists) {
            throw new CustomError("Checkin já realizado", 406);
        }

        const newCheckin = Checkin.toModel({ ...input,id });
        const classAction:ChangeEntity = {
            key: "capacity",
            value: UpdateAction.SUBTRACT,
            collection: "calendar"
        }
        const contractAction:ChangeEntity = {
            key: "availableClasses",
            value: UpdateAction.SUBTRACT,
            collection: "contracts"
        }

        if (type === "single") {
            await this.bookingDB.changeEntity(yogaClassId, classAction)
            await this.bookingDB.createCheckin(newCheckin)
        } else {
            await this.bookingDB.changeEntity(contractId, contractAction)   
            await this.bookingDB.changeEntity(yogaClassId, classAction)
            await this.bookingDB.createCheckin(newCheckin)
        }
    }

    public async createSingleCheckin(input: CreateSingleDTO): Promise<void> {
        const { name, yogaClassId} = input;
        const id = `${name}+${yogaClassId}`;

        const newCheckin = Checkin.toModel({ ...input,id });
        const classAction:ChangeEntity = {
            key: "capacity",
            value: UpdateAction.SUBTRACT,
            collection: "calendar"
        }
        await this.bookingDB.changeEntity(yogaClassId, classAction)
        await this.bookingDB.createCheckin(newCheckin)
    }

    public async deleteCheckin({ id, type }: DeleteDTO): Promise<void> {
        const [contractId, yogaClassId] = id.split("+");

        if (type === "single") {
            await this.bookingDB.deleteCheckin(id);
        } else {
            const contractAction:ChangeEntity = {
                key: "availableClasses",
                value: UpdateAction.ADD,
                collection: "contracts"
            }
            const classAction:ChangeEntity = {
                key: "capacity",
                value: UpdateAction.ADD,
                collection: "calendar"
            }
            await this.bookingDB.changeEntity(contractId, contractAction)   
            await this.bookingDB.changeEntity(yogaClassId, classAction)
            await this.bookingDB.deleteCheckin(id);
        }
    }
}
