import { Checkin } from "../domain/booking.Entity"
import { ChangeEntity } from "../domain/DTOs/booking.changeEntity.dto"


export interface BookingRepository {
    findCheckin(id: string): Promise<Checkin | null >
    findByEntity(id: string, entity: string, limit:number): Promise<Checkin[] >
    createCheckin(checkin: Checkin): Promise<void>
    deleteCheckin(id: string): Promise<void>
    changeEntity(id: string, input:ChangeEntity): Promise<void> 
}