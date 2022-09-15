import { v4 } from "uuid";


export class IdService {
  public generateId = (): string => {
    return v4();
  }
}
 
