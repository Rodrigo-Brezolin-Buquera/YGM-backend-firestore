import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "../application/booking.Repository";
import { BaseInfrastructure } from "../../../config/firebase";
import {
  collection,
  doc,
  getDoc,
  runTransaction,
} from "firebase/firestore/lite";
import { Checkin } from "../domain/booking.Entity";
import { Contract, YogaClass } from "../domain/booking.Types";
import { BookingMapper } from "../domain/booking.Mapper";

export class BookingInfrastructure
  extends BaseInfrastructure
  implements BookingRepository
{
  protected static contractCollection = collection(
    BaseInfrastructure.firestore,
    "contracts"
  );

  protected static yogaClassCollection = collection(
    BaseInfrastructure.firestore,
    "yogaClasses"
  );

  public async changeCheckinsList(
    contractCheckins: Checkin[],
    yogaClassCheckins: Checkin[],
    checkinId: string
  ): Promise<void> {
    try {
      const [contractId, yogaClassId] = checkinId.split("+");

      const modeledContractCheckins = contractCheckins.map((item) =>
        BookingMapper.toModelFireStore(item)
      );
      const modeledYogaClassCheckins = yogaClassCheckins.map((item) =>
      BookingMapper.toModelFireStore(item)
      );

      await runTransaction(
        BaseInfrastructure.firestore,
        async (transaction) => {
          const contractDoc = doc(
            BookingInfrastructure.contractCollection,
            contractId
          );

          const yogaClassDoc = doc(
            BookingInfrastructure.yogaClassCollection,
            yogaClassId
          );

          transaction.update(contractDoc, {
            currentContract: { checkins: modeledContractCheckins },
          });

          transaction.update(yogaClassDoc, {
            checkins: modeledYogaClassCheckins,
          });
        }
      );
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async findContract(contractId: string): Promise<Contract> {
    try {
      const contractRef = doc(
        BookingInfrastructure.contractCollection,
        contractId
      );
      const contractDoc = await getDoc(contractRef);

      if (!contractDoc.exists()) {
        throw CustomError.contractNotFound();
      }

      return BookingMapper.toModelContract(contractDoc.data());
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async findClass(yogaClassId: string): Promise<YogaClass> {
    try {
      const yogaClassRef = doc(
        BookingInfrastructure.yogaClassCollection,
        yogaClassId
      );
      const yogaClassDoc = await getDoc(yogaClassRef);

      if (!yogaClassDoc.exists()) {
        throw CustomError.classNotFound();
      }

      return BookingMapper.toModelYogaClass(yogaClassDoc.data());
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

}
