import { YogaClass } from "../../calendar/domain/calendar.Entity";
import { Contract } from "../../contracts/domain/contracts.Entity";
import { CheckinIdDTO, CreateCheckinDTO, ValidateCheckinDTO } from "./booking.DTO";
import { Checkin } from "./booking.Entity";

export class BookingMapper {

    // os  metodos estão repetidos de outros domains!!!

    public static toModelCheckin(obj: any): Checkin {
        const result = new Checkin(obj.id, obj.verified, obj.name, obj.date);
        return result;
      }
    
    public static toModelContract(obj: any): Contract {
        const result = new Contract(
          obj.id,
          obj.name,
          obj.closedContracts,
          obj.currentContract
        );
        return result;
      }
    
      public static toModelYogaClass(obj: any): YogaClass {
        const result = new YogaClass(
          obj.name,
          obj.date,
          obj.day,
          obj.teacher,
          obj.time,
          obj.groupId,
          obj.checkins,
          obj.id
        );
        return result;
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