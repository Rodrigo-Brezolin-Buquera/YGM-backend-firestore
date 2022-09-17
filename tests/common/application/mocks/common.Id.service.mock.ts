import { IIdService } from "../../../../src/common/aplication/common.ports";

export class IdServiceMock implements IIdService{
    public generateId = jest.fn((): string => {
      return "ID";
    })
  }