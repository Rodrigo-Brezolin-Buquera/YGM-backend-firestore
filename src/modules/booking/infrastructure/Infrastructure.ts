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
import { Contract } from "../../contracts/domain/Domain";
import { YogaClass } from "../../calendar/domain/Domain";

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
      const [contractId, yogaClassId] =checkinId.split("+");

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

      return this.toModelContract(contractDoc.data());
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

      return this.toModelYogaClass(yogaClassDoc.data());
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

  public toModelContract(obj: any): Contract {
    const result = new Contract(
      obj.id,
      obj.name,
      obj.closedContracts,
      obj.currentContract
    );
    return result;
  }

  public toModelYogaClass(obj: any): YogaClass {
    const result = new YogaClass(
      obj.name,
      obj.date,
      obj.day,
      obj.teacher,
      obj.time,
      obj.groupId,
      obj.checkins,
      obj.id
    );
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
