import { Checkin } from "../domain/Domain"

export interface BookingRepository {
    createCheckin(checkin: Checkin) : Promise<void>
    validateCheckin() : Promise<void>
    deleteCheckin() : Promise<void>
}