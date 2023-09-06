import { Day, StyleName } from "../../../../src/common/domain/common.enum";
import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";

const input = {
  id: "id",
  name: StyleName.HATHA,
  date: "20/05/2022",
  day: Day.MON,
  teacher: "teacher",
  time: "19:00",
  capacity: 8,
  groupId: "groupId",
};

describe("Calendar entity", () => {
  test("Sucess case", () => {
    const result = YogaClass.toModel(input);
    expect(result).toBeInstanceOf(YogaClass);
  });

  test("Sucess case: getters", () => {
    const result = YogaClass.toModel(input);
    expect(result.getId()).toBe(input.id);
    expect(result.getName()).toBe(input.name);
    expect(result.getDate()).toBe(input.date);
    expect(result.getDay()).toBe(input.day);
    expect(result.getTeacher()).toBe(input.teacher);
    expect(result.getTime()).toBe(input.time);
    expect(result.getCapacity()).toBe(input.capacity);
    expect(result.getGroupId()).toBe(input.groupId);
  });

  test("Error: invalid styleName", () => {
    expect.assertions(2);
    try {
      input.name = "AAAAAA" as any;
      YogaClass.toModel(input);
    } catch (error: any) {
      expect(error.message).toBe(
        "A aula precisa ser: Hatha Yoga, Vinyasa Flow ou Yoga Restaurativo"
      );
      expect(error.statusCode).toBe(400);
      input.name = StyleName.HATHA
    }
  });

  const invalidDayFormats = [
    "segunda",
    "Segunda-feira",
    "Terca",
    "Sabado",
    "Domingo",
  ];
  invalidDayFormats.forEach((day) => {
    test(`Invalid day ${day}`, () => {
      expect.assertions(2);
      try {
        input.day = day as any;
        YogaClass.toModel(input);
      } catch (error: any) {
        expect(error.message).toBe("Dia de aula inválido");
        expect(error.statusCode).toBe(400);
      }
    });
  });
});
