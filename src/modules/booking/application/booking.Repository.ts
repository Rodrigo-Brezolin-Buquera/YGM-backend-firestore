import { YogaClass } from "../../calendar/domain/calendar.Entity"
import { Contract } from "../../contracts/domain/contracts.Entity"
import { Checkin } from "../domain/booking.Entity"


export interface BookingRepository {
    changeCheckinsList(contractCheckins:Checkin[], yogaClassCheckins:Checkin[], checkinId: string) : Promise<void>
    findContract(contractId: string): Promise<Contract>
    findClass(yogaClassId: string): Promise<YogaClass>
}