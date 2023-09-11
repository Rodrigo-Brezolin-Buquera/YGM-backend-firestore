import { IIdService } from "../../../src/common/services/common.ports";


export class IdServiceMock implements IIdService{
    public generateId = (): string => {
      return "id";
    }
  }