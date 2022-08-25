import { Checkin } from "../domain/booking.Entity";
import {
  CreateCheckinDTO,
  CheckinIdDTO,
  ValidateCheckinDTO,
} from "../domain/booking.DTO";
import { BookingRepository } from "./booking.Repository";
import { Contract, YogaClass } from "../domain/booking.Types";

export class BookingApplication {
  constructor(
    private bookingContractService: BookingRepository,
    private bookingYogaClassService: BookingRepository
  ) {}

  public async createCheckin(input: CreateCheckinDTO): Promise<void> {
    const { contractId, yogaClassId, token } = input;
    Checkin.verifyUserPermission(token);
    Checkin.checkEmptyInput(input);
    const checkinId = `${contractId.trim()}+${yogaClassId.trim()}`;


    // fazer request! 
    
    // const contract = (await this.bookingContractService.findByIdWith(
    //   contractId
    // )) as Contract;
    // const yogaClass = (await this.bookingYogaClassService.findByIdWith(
    //   yogaClassId
    // )) as YogaClass;

    // verifyIfCheckinExists(contract.currentContract.checkins, checkinId); // endpoint de buscar checkin

    const newCheckin = new Checkin(
      contract.name.trim(),
      yogaClass.date.trim(),
      yogaClassId.trim(),
      contractId.trim()
    );

    newCheckin.checkName();
    Checkin.isValidDate(yogaClass.date);

 // add no banco
  
  }

  public async validateCheckin(input: ValidateCheckinDTO): Promise<void> {
    const { checkinId, verified, token } = input;  // como vai chegar o id?
    Checkin.verifyUserPermission(token);
    Checkin.checkEmptyInput(input);
    const [contractId, yogaClassId] = checkinId.trim().split("+");

   


    
      // update checkin
   
  }

  public async deleteCheckin({
    checkinId,
    token,
  }: CheckinIdDTO): Promise<void> {
    Checkin.verifyUserPermission(token);
    Checkin.checkId(checkinId);
    const [contractId, yogaClassId] = checkinId.trim().split("+");



    // delete checkins

  
  }
}
