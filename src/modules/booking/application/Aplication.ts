import { CustomError } from "../../../common/customError/customError";
import { BookingRepository } from "./Repository";

// import { transporter } from "../../../common/services/mailTransporter";

export class BookingApplication {
  constructor(private bookingInfrastructure: BookingRepository) {}

  public async createCheckin(): Promise<void> {
    try {
     
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
