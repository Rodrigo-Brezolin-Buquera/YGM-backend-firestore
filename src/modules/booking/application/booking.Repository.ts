import { YogaClass,Contract } from "../domain/booking.Types"
import { Checkin } from "../domain/booking.Entity"


export interface BookingRepository {
    changeCheckinsList(checkinsList:Checkin[], id: string) : Promise<void>
    findByIdWith(id: string): Promise<Contract | YogaClass>
  
}