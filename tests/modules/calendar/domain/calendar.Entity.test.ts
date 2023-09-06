import { Day, StyleName } from "../../../../src/common/domain/common.enum";
import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";




const input =  {
    id: "id",
    name: StyleName.HATHA,
    date: "20/05/2022",
    day: Day.MON,
    teacher: "teacher",
    time: "19:00",
    capacity: 8,
    groupId: "groupId",

}

describe("Calendar entity", () => {
  test("Sucess case", () => {
        const result = YogaClass.toModel(input)
      expect(result).toBeInstanceOf(YogaClass);
  });

 


});
