import { YogaClass } from "../../calendar/domain/Domain"
import { Contract } from "../../contracts/domain/Domain"
import { Checkin } from "../domain/Domain"


export interface BookingRepository {
    changeCheckinsList(contractCheckins:Checkin[], yogaClassCheckins:Checkin[]) : Promise<void>
    // validateCheckin(contractCheckins: Checkin[], yogaClassCheckins: Checkin[]) : Promise<void>
    // deleteCheckin(contractCheckins: Checkin[], yogaClassCheckins: Checkin[]) : Promise<void>
    findContract(contractId: string): Promise<Contract>
    findClass(yogaClassId: string): Promise<YogaClass>
}