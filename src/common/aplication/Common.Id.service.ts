import { v4 } from "uuid";
import { IIdService } from "./common.ports";


export class IdService implements IIdService{
  public generateId = (): string => {
    return v4();
  }
}
 
