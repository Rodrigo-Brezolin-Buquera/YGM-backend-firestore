import {
    CheckinIdDTO,
    CheckinTokenDTO,
    CreateCheckinDTO,
    FindCheckinDTO,
    ValidateCheckinDTO,
  } from "../domain/booking.DTO";
  
  
  export class BookingDTOMapper {

    public static toFindCheckinDTO(req: any): FindCheckinDTO {
      return {
        id: req.params.id,
        entity: req.params.entity,
        token: req.headers.authorization!,
      };
    }
  
    public static toCheckinIdDTO(req: any): CheckinIdDTO {
      return {
        id: req.params.id,
        token: req.headers.authorization!
      };
    }
  
    public static toValidateCheckinDTO(req: any): ValidateCheckinDTO {
      return {
        checkinId: req.body.checkinId?.trim(),
        verified: req.body.verified,
        token: req.headers.authorization!,
      };
    }
  
    public static toCreateCheckinDTO(req: any): CreateCheckinDTO {
      return {
        contractId: req.body.contractId?.trim(),
        yogaClassId: req.body.yogaClassId?.trim(),
        token: req.headers.authorization!,
      };
    }
  
    public static toTokenDTO(req: any): CheckinTokenDTO {
      return {
        token: req.headers.authorization!,
      };
    }
    
  }
  