import { CustomError } from "../../../common/customError/customError";
import { generateId } from "../../../common/services/IdGenerator";
import { addOneWeek } from "../../../common/services/moment";
import { YogaClass } from "../domain/Domain";
import { CalendarCheckin, createClassDTO } from "../domain/Types";
import { CalendarRepository } from "./Repository";


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

  public async createClass(input: createClassDTO): Promise<void> {
    try {
      const {name, date, day, time, teacher} = input
      const groupId = generateId()
      const checkins: CalendarCheckin[] = []

        // mudar a logica para fazer as verificaçôes apenas 1 vez

        let crescentDate = date
      for (let i: number = 0; i < 2; i++) { // só 2 pra não cagar no banco
        const id = generateId()

        const yogaClass = new YogaClass(name, crescentDate, day, teacher, time,checkins, groupId, id)

        // fazer os testes!!!

        crescentDate = addOneWeek(crescentDate)
       
        await this.calendarInfrastructure.createClass(yogaClass)
    }


    
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
