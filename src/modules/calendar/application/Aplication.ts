import { CustomError } from "../../../common/customError/customError";
import { YogaClass } from "../domain/Domain";
import { CalendarRepository } from "./Repository";
// import {  } from "../domain/Types";
// import {  } from "../domain/Domain";



export class CalendarApplication {
  constructor(private calendarInfrastructure: CalendarRepository) {}

  public async findAllClasses( ): Promise<YogaClass[]> {
    try {
        const result = this.calendarInfrastructure.findAllClasses()
   
        return result
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async createClass(): Promise<void> {
    try {
      
    
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async editClass(): Promise<void> {
    try {
      
  

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteClass(): Promise<void> {
    try {
      
  

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
