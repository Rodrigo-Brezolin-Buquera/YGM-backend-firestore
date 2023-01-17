import { InvalidCapacity, InvalidDay, InvalidTeacher, InvalidTime, InvalidYogaType } from "../../../../src/common/customError/invalidRequests";
import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";
import { Day, Teacher } from "../../../../src/modules/calendar/domain/calendar.Types";

const instanceOfYogaClass = (obj:any): YogaClass => {
   return new YogaClass(
        obj.name,
        obj.date,
        obj.day,
        obj.teacher,
        obj.time,
        obj.capacity,
        obj.groupId,
        obj.id
      )
}

const getInitialObject = ():any => {
  return {
    name: "name",
    date: "20/05/2022",
    day: Day.MON,
    teacher: Teacher.LOUIZE,
    time: "19:00",
    capacity: 8,
    groupId: "id",
    id: "id",
  };
}

describe("Sucess Tests on calendar entity", () => {
  const obj: any = getInitialObject()
  test("Sucess case with all parameters", () => {
    expect.assertions(1);
    try {
      const result = instanceOfYogaClass(obj);
      expect(result).toBeInstanceOf(YogaClass);
    } catch (error:any) {}
  });

  test("Sucess case without id ", () => {
    expect.assertions(1);
    try {
      const result = new YogaClass(
        obj.name,
        obj.date,
        obj.day,
        obj.teacher,
        obj.time,
        obj.groupId,
        obj.checkins
      );
      expect(result).toBeInstanceOf(YogaClass);
    } catch (error:any) {}
  });

  test("Sucess case without id and checkins", () => {
    expect.assertions(1);
    try {
      const result = instanceOfYogaClass(obj)
      expect(result).toBeInstanceOf(YogaClass);
    } catch (error:any) {}
  });


});

describe("Fail name tests on calendar entity", () => {
  const obj: any = getInitialObject()
  const currentError = new InvalidYogaType();

  test("Invalid without name", () => {
    expect.assertions(3);
    obj.name = ""
    try {
        instanceOfYogaClass(obj).checkName()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with wrong name", () => {
    expect.assertions(3);
    obj.name = "gwegwege"
    try {
        instanceOfYogaClass(obj).checkName()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("Fail day tests on calendar entity", () => {
  const obj: any = getInitialObject()
  const currentError = new InvalidDay();

  test("Invalid without day", () => {
    expect.assertions(3);
    obj.day = ""
    try {
        instanceOfYogaClass(obj).checkDay()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with wrong day", () => {
    expect.assertions(3);
    obj.day = "gwegwege"
    try {
        instanceOfYogaClass(obj).checkDay()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("Fail time tests on calendar entity", () => {
  const obj: any = getInitialObject()
  const currentError = new InvalidTime();

  test("Invalid without time", () => {
    expect.assertions(3);
    obj.time = ""
    try {
       instanceOfYogaClass(obj).checkTime()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with 1900 time", () => {
    expect.assertions(3);
    obj.time = "1900"
    try {
       instanceOfYogaClass(obj).checkTime()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with 19h time", () => {
    expect.assertions(3);
    obj.time = "19h"
    try {
       instanceOfYogaClass(obj).checkTime()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with 19h00m time", () => {
    expect.assertions(3);
    obj.time = "19h00m"
    try {
       instanceOfYogaClass(obj).checkTime()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with 19-00 time", () => {
    expect.assertions(3);
    obj.time = "19-00"
    try {
       instanceOfYogaClass(obj).checkTime()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
  
});

describe("Fail teacher tests on calendar entity", () => {
  const obj: any = getInitialObject()
  const currentError = new InvalidTeacher();

  test("Invalid without teacher", () => {
    expect.assertions(3);
    obj.teacher = ""
    try {
       instanceOfYogaClass(obj).checkTeacher()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid witho wrong teacher", () => {
    expect.assertions(3);
    obj.teacher = "gwegwegdgd"
    try {
       instanceOfYogaClass(obj).checkTeacher()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });


  
});

describe("Fail capacity tests on calendar entity", () => {
  const obj: any = getInitialObject()
  const currentError = new InvalidCapacity();

  test("Invalid without capacity", () => {
    expect.assertions(3);
    obj.capacity = undefined
    try {
       instanceOfYogaClass(obj).checkCapacity()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with negative capacity", () => {
    expect.assertions(3);
    obj.capacity = -5
    try {
       instanceOfYogaClass(obj).checkCapacity()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with zero capacity", () => {
    expect.assertions(3);
    obj.capacity = 0
    try {
       instanceOfYogaClass(obj).checkCapacity()
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });



  
});