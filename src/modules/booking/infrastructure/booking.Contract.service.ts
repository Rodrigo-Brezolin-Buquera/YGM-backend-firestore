import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "../application/booking.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import { Checkin } from "../domain/booking.Entity";
import { Contract } from "../domain/booking.Types";
import { BookingMapper } from "../domain/booking.Mapper";
import { ContractNotFound } from "../../../common/customError/notFound";

export class BookingContractService
  extends BaseInfrastructure
  implements BookingRepository
{
  private contractCollection = BaseInfrastructure.admin
    .firestore()
    .collection("contracts");

  public async changeCheckinsList(
    contractCheckins: Checkin[],
    contractId: string
  ): Promise<void> {
    try {
      const modeledContractCheckins = contractCheckins.map((item) =>
        BookingMapper.toFireStoreCheckin(item)
      );

      await this.contractCollection
        .doc(contractId)
        .update({ currentContract: { checkins: modeledContractCheckins } });
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findByIdWith(contractId: string): Promise<Contract> {
    try {
      const contractDoc = await this.contractCollection.doc(contractId).get();

      if (!contractDoc.exists) {
        throw new ContractNotFound()
      }

      return BookingMapper.toContract(contractDoc.data());
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
