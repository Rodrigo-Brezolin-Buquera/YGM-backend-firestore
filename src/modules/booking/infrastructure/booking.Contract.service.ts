import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "../application/booking.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore/lite";
import { Checkin } from "../domain/booking.Entity";
import { Contract } from "../domain/booking.Types";
import { BookingMapper } from "../domain/booking.Mapper";

export class BookingContractService 
  extends BaseInfrastructure
  implements BookingRepository
{
  // protected static contractCollection = collection(
  //   BaseInfrastructure.firestore,
  //   "contracts"
  // );

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
      
      const contractDoc = doc(
        BookingContractService.contractCollection,
        contractId
      );

      await updateDoc(contractDoc, {
        currentContract: {checkins: modeledContractCheckins }
      });


    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async findByIdWith(contractId: string): Promise<Contract> {
    try {
      const contractRef = doc(
        BookingContractService.contractCollection,
        contractId
      );
      const contractDoc = await getDoc(contractRef);

      if (!contractDoc.exists()) {
        throw CustomError.contractNotFound();
      }

      return BookingMapper.toContract(contractDoc.data());
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

}
