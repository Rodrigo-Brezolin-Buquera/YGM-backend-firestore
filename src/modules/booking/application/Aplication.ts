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
    
      const {contractCheckins, name} = await this.bookingInfrastructure.findCheckinByContract(contractId)
      const {yogaClassCheckins, date} = await this.bookingInfrastructure.findCheckinByClass(yogaClassId)

      const newCheckin = new Checkin(checkinId, false, name, date);

      newCheckin      
        .checkId(contractId)
        .checkId(yogaClassId)
        .checkId(checkinId)

      contractCheckins.push(newCheckin)
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
