// import { AuthRepository } from "../../../../../src/modules/auth/business/auth.Repository";
// import {
//   LoginOutput,
//   ResetPasswordOutput,
// } from "../../../../../src/modules/auth/domain/auth.DTO";
// import { User } from "../../../../../src/modules/auth/domain/auth.Entity";

// export class AuthInfrastructureMock implements AuthRepository {
//    login = jest.fn( async(auth: string): Promise<LoginOutput> => {
//     return {
//       id: "ID",
//       admin: true,
//     }
//   })
//    createUser = jest.fn( async(auth: User): Promise<void> => {})
//    deleteUser = jest.fn( async(id: string): Promise<void> => {})
//    changePassword= jest.fn( async (id: string): Promise<ResetPasswordOutput> => {
//     return {
//       email: "email",
//       resetLink: "link",
//     };
//   })
// }
