import { IIdService } from "../../../../src/common/aplication/common.ports";

export class IdServiceMock implements IIdService{
    public generateId = (): string => {
      return "ID";
    }
  }