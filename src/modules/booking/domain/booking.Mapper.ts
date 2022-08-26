import {
  CheckinIdDTO,
  CreateCheckinDTO,
  FindCheckinDTO,
  ValidateCheckinDTO,
} from "./booking.DTO";
import { Checkin } from "./booking.Entity";

export class BookingMapper {
  public static toCheckin(obj: any): Checkin {
    const result = new Checkin(obj.verified, obj.name, obj.date, obj.classId, obj.contractId);
    return result;
  }

  public static toFireStoreCheckin(Checkin: Checkin): any {
    const result = {
      id: Checkin.id,
      verified: Checkin.verified,
      name: Checkin.name,
      date: Checkin.date,
      yogaClassId: Checkin.yogaClassId,
      contractId: Checkin.contractId
    };
    return result;
  }

  public static toFindCheckinDTO(req: any): FindCheckinDTO {
    return {
      id: req.params.id.trim(),
      entity: req.params.id.trim(),
      token: req.headers.authorization!.trim(),
    };
  }

  public static toCheckinIdDTO(req: any): CheckinIdDTO {
    return {
      id: req.params.id.trim(),
      token: req.headers.authorization!.trim()
    };
  }

  public static toValidateCheckinDTO(req: any): ValidateCheckinDTO {
    return {
      checkinId: req.body.checkinId.trim(),
      verified: req.body.verified,
      token: req.headers.authorization!.trim(),
    };
  }

  public static toCreateCheckinDTO(req: any): CreateCheckinDTO {
    return {
      contractId: req.body.contractId.trim(),
      yogaClassId: req.body.yogaClassId.trim(),
      token: req.headers.authorization!.trim(),
    };
  }

  
}
