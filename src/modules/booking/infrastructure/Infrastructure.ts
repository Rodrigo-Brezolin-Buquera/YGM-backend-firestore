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
import { ContractCheckinData, YogaClassCheckinData } from "../domain/Types";

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

  public async createCheckin(
    contractCheckins: Checkin[],
    yogaClassCheckins: Checkin[]
  ): Promise<void> {
    try {
      const [contractId, yogaClassId] =
        contractCheckins[contractCheckins.length - 1].id.split("+");

      const modeledContractCheckins = contractCheckins.map((item) =>
        this.toModelFireStore(item)
      );
      const modeledYogaClassCheckins = yogaClassCheckins.map((item) =>
        this.toModelFireStore(item)
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

  public async findCheckinByContract(
    contractId: string
  ): Promise<ContractCheckinData> {
    try {
      const contractDoc = doc(
        BookingInfrastructure.contractCollection,
        contractId
      );
      const contract = await getDoc(contractDoc);

      if (!contract.exists()) {
        throw CustomError.contractNotFound();
      }

      const contractCheckins = contract
        .data()
        .currentContract.checkins.map((checkin) =>
          this.toModelCheckin(checkin)
        );

      return { contractCheckins, name: contract.data().name };
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async findCheckinByClass(
    yogaClassId: string
  ): Promise<YogaClassCheckinData> {
    try {
      const yogaClassDoc = doc(
        BookingInfrastructure.yogaClassCollection,
        yogaClassId
      );
      const yogaClass = await getDoc(yogaClassDoc);

      if (!yogaClass.exists()) {
        throw CustomError.classNotFound();
      }

      const yogaClassCheckins = yogaClass
        .data()
        .checkins.map((checkin) => this.toModelCheckin(checkin));

      return { yogaClassCheckins, date: yogaClass.data().date };
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public toModelCheckin(obj: any): Checkin {
    const result = new Checkin(obj.id, obj.verified, obj.name, obj.date);
    return result;
  }

  public toModelFireStore(Checkin: Checkin): any {
    const result = {
      id: Checkin.id,
      verified: Checkin.verified,
      name: Checkin.name,
      date: Checkin.date,
    };
    return result;
  }
}
