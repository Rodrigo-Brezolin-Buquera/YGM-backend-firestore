import { CustomError } from "../../../common/customError/customError";
import { Checkin } from "../domain/Domain";
import { CreateCheckinDTO } from "../domain/Types";
import { BookingRepository } from "./Repository";

// import { transporter } from "../../../common/services/mailTransporter";

export class BookingApplication {
  constructor(private bookingInfrastructure: BookingRepository) {}

  public async createCheckin({contractId, yogaClassId}: CreateCheckinDTO): Promise<void> {
    try {
      const checkinId = `${contractId}+${yogaClassId}`;
    
      const contract = await this.bookingInfrastructure.findContract(contractId)
      const yogaClass = await this.bookingInfrastructure.findClass(yogaClassId)

      const newCheckin = new Checkin(checkinId, false, contract.name, yogaClass.date);

      newCheckin      
        .checkId(contractId)
        .checkId(yogaClassId)
        .checkId(checkinId)
        .checkName()
        .checkDate()

      const contractCheckins = contract.currentContract.checkins
      contractCheckins.push(newCheckin)
      
      const yogaClassCheckins = yogaClass.checkins
      yogaClassCheckins.push(newCheckin)

      await this.bookingInfrastructure.createCheckin(contractCheckins, yogaClassCheckins )  

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
