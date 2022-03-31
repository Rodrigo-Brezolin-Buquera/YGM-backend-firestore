import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "../application/Repository";

import { BaseInfrastructure } from "../../../config/firebase";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  runTransaction,
} from "firebase/firestore/lite";
import { Checkin } from "../domain/Domain";

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

  public async createCheckin(checkin: Checkin): Promise<void> {
    try {
      const [contractId, yogaClassId] = checkin.id.split("+");

      await runTransaction(
        BaseInfrastructure.firestore,
        async (transaction) => {
          const contractDoc = doc(
            BookingInfrastructure.contractCollection,
            contractId
          );
          const contract = await transaction.get(contractDoc);

          if (!contract.exists()) {
            throw CustomError.contractNotFound();
          }

          const yogaClassDoc = doc(
            BookingInfrastructure.yogaClassCollection,
            yogaClassId
          );
          const yogaClass = await transaction.get(yogaClassDoc);

          if (!yogaClass.exists()) {
            throw CustomError.classNotFound();
          }

          const contracCheckins = contract.data().currentContract.checkins;

          const newContractCheckin = [
            ...contracCheckins,
            {
              id: checkin.id,
              verified: checkin.verified,
              date: yogaClass.data().date,
            },
          ];

          transaction.update(contractDoc, {
            currentContract: { checkins: newContractCheckin },
          });

          const yogaClassCheckins = yogaClass.data().checkins;

          const newYogaClassCheckins = [
            ...yogaClassCheckins,
            {
              id: checkin.id,
              verified: checkin.verified,
              name: contract.data().name,
            },
          ];

          transaction.update(yogaClassDoc, { checkins: newYogaClassCheckins });
        }
      );
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async validateCheckin(): Promise<void> {
    try {
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteCheckin(): Promise<void> {
    try {
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
