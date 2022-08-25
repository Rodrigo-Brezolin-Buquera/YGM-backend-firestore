// import { BookingRepository } from "../application/booking.Repository";
// import { BaseInfrastructure } from "../../../config/firebase";
// import { Contract, CurrentContract } from "../domain/booking.Types";
// import { BookingMapper } from "../domain/booking.Mapper";
// import { ContractNotFound } from "../../../common/customError/notFound";

// export class BookingContractService
//   extends BaseInfrastructure
//   implements BookingRepository
// {
//   private contractCollection = BaseInfrastructure.admin
//     .firestore()
//     .collection("contracts");

//   public async changeCheckinsList(
//     currentContract: CurrentContract,
//     contractId: string
//   ): Promise<void> {
//     const modeledContractCheckins = currentContract.checkins.map((item) =>
//       BookingMapper.toFireStoreCheckin(item)
//     );
//     currentContract.checkins = modeledContractCheckins;

//     await this.contractCollection.doc(contractId).update({ currentContract });
//   }

//   public async findByIdWith(contractId: string): Promise<Contract> {
//     const contractDoc = await this.contractCollection.doc(contractId).get();

//     if (!contractDoc.exists) {
//       throw new ContractNotFound();
//     }

//     return BookingMapper.toContract(contractDoc.data());
//   }
// }
