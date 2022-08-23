import { YogaClass,Contract, CurrentContract } from "../domain/booking.Types"
import { Checkin } from "../domain/booking.Entity"


export interface BookingRepository {
    changeCheckinsList(input:Checkin[] | CurrentContract, id: string) : Promise<void>
    findByIdWith(id: string): Promise<Contract | YogaClass>
  
}