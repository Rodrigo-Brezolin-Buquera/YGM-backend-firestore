import { Checkin } from "../domain/booking.Entity"


export interface BookingRepository {
    findCheckin(id: string): Promise<Checkin | null >
    findByEntity(id: string, entity: string): Promise<Checkin[] >
    createCheckin(checkin: Checkin): Promise<void>
    deleteCheckin(id: string): Promise<void>
}