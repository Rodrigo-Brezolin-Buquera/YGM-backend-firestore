// import { BookingRepository } from "../../../../../src/modules/booking/business/booking.Repository";
// import { Checkin } from "../../../../../src/modules/booking/domain/booking.Entity";
// import { checkinMock } from "./Checkin.mock";

// export class BookingInfrastructureMock implements BookingRepository {
//     findCheckinById = jest.fn(async (id: string): Promise<Checkin | undefined> => {
//     return id === "RETURN+CHECKIN" ? checkinMock : undefined
//   })
//    findById =  jest.fn( async(id: string, entity: string): Promise<Checkin[]>=> {
//     return id === "RETURN+CHECKIN" ? [checkinMock, checkinMock] : []
//   })
//    createCheckin =jest.fn(async(checkin: Checkin): Promise<void>=> {})
//    validateCheckin =jest.fn(async(id: string, verified: boolean): Promise<void> =>{})
//    deleteCheckin =jest.fn(async(id: string): Promise<void> =>{})
//    deleteAllCheckinByContract =jest.fn(async(id: string): Promise<void> =>{})
// }
