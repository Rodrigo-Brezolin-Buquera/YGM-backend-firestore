import { InvalidName, InvalidRequest } from "../../../common/customError/customError";
import { CalendarCheckin } from "./Types";

export class YogaClass {
    constructor(
       public readonly name: string,
       public readonly date: string,
       public readonly day: string,
       public readonly teacher: string,
       public readonly time: string,
       public readonly checkins: CalendarCheckin[],
       public readonly groupId: string,
       public readonly id?: string,

    
    ) { }
    public checkName(name:string) {
        if(!name){
          throw new InvalidRequest
        }



        
        return this;
      }
    

    public checkId(id:string) {
      if(!id){
        throw new InvalidRequest
      }
      return this;
    }

   

    }