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
      id: req.params.id,
      entity: req.params.id,
      token: req.headers.authorization!,
    };
  }

  public static toCheckinIdDTO(req: any): CheckinIdDTO {
    return {
      id: req.params.id,
      token: req.headers.authorization!,
      allCheckins: req.query.allCheckins
    };
  }

  public static toValidateCheckinDTO(req: any): ValidateCheckinDTO {
    return {
      checkinId: req.body.checkinId,
      verified: req.body.verified,
      token: req.headers.authorization!,
    };
  }

  public static toCreateCheckinDTO(req: any): CreateCheckinDTO {
    return {
      contractId: req.body.contractId,
      yogaClassId: req.body.yogaClassId,
      token: req.headers.authorization!,
    };
  }

  
}
