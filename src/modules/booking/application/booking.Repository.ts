import { YogaClass,Contract, CurrentContract } from "../domain/booking.Types"
import { Checkin } from "../domain/booking.Entity"


export interface BookingRepository {
    findByCheckId(id: string): Promise<Checkin >
    findById(id: string, idType: string): Promise<Checkin[] >
    createCheckin(checkin: Checkin): Promise<void>
    verifiedCheckin(id: string): Promise<void>
    deleteCheckin(id: string): Promise<void>
    deleteAllCheckinByContract(id: string): Promise<void>
}