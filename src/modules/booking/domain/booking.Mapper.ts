import { YogaClass } from "./booking.Types";
import { Contract } from "./booking.Types";
import { CheckinIdDTO, CreateCheckinDTO, ValidateCheckinDTO } from "./booking.DTO";
import { Checkin } from "./booking.Entity";

export class BookingMapper {

    public static toModelCheckin(obj: any): Checkin {
        const result = new Checkin(obj.id, obj.verified, obj.name, obj.date);
        return result;
      }
    
    public static toModelContract(obj: any): Contract {
        return {
         id: obj.id,
         name: obj.name,
         closedContracts: obj.closedContracts,
         currentContract:  obj.currentContract
         }
    
      }
    
      public static toModelYogaClass(obj: any): YogaClass {
        
        return { 
          name:obj.name,
          date:obj.date,
          day:obj.day,
          teacher:obj.teacher,
          time:obj.time,
          groupId:obj.groupId,
          checkins:obj.checkins,
          id:obj.id
        }
        
      }
    
      public static toModelFireStore(Checkin: Checkin): any {
        const result = {
          id: Checkin.id,
          verified: Checkin.verified,
          name: Checkin.name,
          date: Checkin.date,
        };
        return result;
      }
   

    public static toModelCheckinIdDTO(req: any): CheckinIdDTO {
        return { checkinId:  req.params.checkinId }        
      }

      public static toModelValidateCheckinDTO(req: any): ValidateCheckinDTO {
        return {
            checkinId: req.body.checkinId,
            verified: req.body.verified,
          };      
      }

      public static toModelCreateCheckinDTO(req: any): CreateCheckinDTO {
        return {
            contractId: req.body.contractId,
            yogaClassId: req.body.yogaClassId,
          };   
      }

}