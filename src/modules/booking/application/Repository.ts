import { YogaClass } from "../../calendar/domain/Domain"
import { Contract } from "../../contracts/domain/Domain"
import { Checkin } from "../domain/Domain"


export interface BookingRepository {
    createCheckin(contractCheckins:Checkin[], yogaClassCheckins:Checkin[]) : Promise<void>
    validateCheckin() : Promise<void>
    deleteCheckin() : Promise<void>
    findContract(contractId: string): Promise<Contract>
    findClass(yogaClassId: string): Promise<YogaClass>
}