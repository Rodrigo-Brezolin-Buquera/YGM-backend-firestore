import { CustomError } from "../../../common/customError/customError";
import { generateId } from "../../../common/services/IdGenerator";
import { addOneWeek, compareDates } from "../../../common/services/moment";
import { YogaClass } from "../domain/Domain";
import { CalendarCheckin, CreateClassDTO, EditClassDTO } from "../domain/Types";
import { CalendarRepository } from "./Repository";

export class CalendarApplication {
  constructor(private calendarInfrastructure: CalendarRepository) {}

  public async findAllClasses(): Promise<YogaClass[]> {
    try {
      const result = this.calendarInfrastructure.findAllClasses();

      return result;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async createClass(input: CreateClassDTO): Promise<void> {
    try {
      const { name, date, day, time, teacher } = input;
      const groupId = generateId();
      const checkins: CalendarCheckin[] = [];

      const validationClass = new YogaClass(
        name,
        date,
        day,
        teacher,
        time,
        groupId
      );

      validationClass
        .checkName(name)
        .checkDate(date)
        .checkDay(day)
        .checkTeacher(teacher)
        .checkTime(time);

      let crescentDate = date;
      for (let i: number = 0; i < 2; i++) {
        // só 2 pra não cagar no banco, dps alterar para 50
        const id = generateId();
        const yogaClass = new YogaClass(
          name,
          crescentDate,
          day,
          teacher,
          time,
          groupId,
          checkins,
          id
        );
        crescentDate = addOneWeek(crescentDate);

        await this.calendarInfrastructure.createClass(yogaClass);
      }
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async editClass(input: EditClassDTO): Promise<void> {
    const { name, date, day, time, teacher, groupId, changingDate } = input;

    const editedClass = new YogaClass(name, date, day, teacher, time, groupId);

    editedClass
      .checkName(name)
      .checkDate(date)
      .checkDay(day)
      .checkTeacher(teacher)
      .checkTime(time)
      .checkId(groupId);

    const yogaClassList = await this.calendarInfrastructure.findAllClasses();

    const selectedClasses = yogaClassList.filter(
      (currentClass) => {
        return (
          currentClass.groupId === editedClass.groupId &&
          compareDates(currentClass.date, changingDate)
        )
      }
    );

    selectedClasses.forEach((currentClass)=>{
      currentClass.day = 11
      // preciso efetivar as mudanças, mas como fazer isso? permitir alterar as instancias? criar métodos? 
      // criar outra instancia e alterar 1 de cada vez? ou alterar todos em bloco?
      // criando instancias novas eu poderia altear no banco 1 a 1: 
      //prós: não altera a imutabilidade do dominio, 
      //contra: criar novas instancias(eficiencia) e pode dar problema no meio

    })


    await this.calendarInfrastructure.editClass(selectedClasses)

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
