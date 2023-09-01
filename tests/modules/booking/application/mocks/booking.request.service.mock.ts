// import { IBookingRequestSerive } from "../../../../../src/modules/booking/business/booking.ports";
// import {
//   Contract,
//   PLAN,
//   YogaClass,
// } from "../../../../../src/modules/booking/domain/booking.Types";

// export class BookingRequestServiceMock implements IBookingRequestSerive {
//    requestContract = jest.fn( async (token: string): Promise<Contract> => {
//     return {
//       id: "id",
//       name: "name name",
//       closedContracts: [
//         {
//           plan: PLAN.MONTHLYX1,
//           ended: "20/12/2010",
//         },
//       ],
//       currentContract: {
//         active: true,
//         plan: PLAN.MONTHLYX2,
//         started: "20/12/2010",
//         ends: "20/12/2011",
//         availableClasses: token === "NOCLASS" ? 0 : 10,
//       },
//     };
//   })
//    requestYogaClass =jest.fn(async (id: string, token: string): Promise<YogaClass> => {
//     return {
//       name: "name name",
//       date: "20/12/2010",
//       day: "Segunda",
//       teacher: "Rodrigo",
//       time: "18:00",
//       capacity: token === "NOCAPACITY" ? 0 : 10,
//       groupId: "id",
//       id: "id",
//     };
//   })
//    requestChangeClass =jest.fn( async(
//     id: string,
//     action: string, 
//     token: string
//   ): Promise<void> => {})
//    requestChangeCapacity  =jest.fn(async(
//     id: string,
//     action: string,
//     token: string
//   ): Promise<void> => {})
// }
