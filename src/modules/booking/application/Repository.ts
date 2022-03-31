export interface BookingRepository {
    createCheckin() : Promise<void>
    validateCheckin() : Promise<void>
    deleteCheckin() : Promise<void>
}