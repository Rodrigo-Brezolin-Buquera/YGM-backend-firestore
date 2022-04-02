import { Checkin } from "../domain/Domain"
import { ContractCheckinData, YogaClassCheckinData } from "../domain/Types"

export interface BookingRepository {
    createCheckin(contractCheckins:Checkin[], yogaClassCheckins:Checkin[]) : Promise<void>
    validateCheckin() : Promise<void>
    deleteCheckin() : Promise<void>
    findCheckinByContract(contractId: string): Promise<ContractCheckinData>
    findCheckinByClass(yogaClassId: string): Promise<YogaClassCheckinData>
}