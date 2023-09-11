import { IdDTO } from "../../../../src/common/domain/common.id.dto";
import { BookingRepository } from "../../../../src/modules/booking/business/booking.Repository";
import { Checkin } from "../../../../src/modules/booking/domain/booking.Entity";
import { CreateCheckinDTO } from "../../../../src/modules/booking/domain/DTOs/booking.create.dto";
import { CreateSingleDTO } from "../../../../src/modules/booking/domain/DTOs/booking.createSingle.dto";
import { DeleteDTO } from "../../../../src/modules/booking/domain/DTOs/booking.delete.dto";
import { FindUserCheckinsDTO } from "../../../../src/modules/booking/domain/DTOs/booking.findUserCheckin.dto";
import { FindCheckinDTO } from "../../../../src/modules/booking/domain/DTOs/booking.getByEntity.dto";

export class BookingBusiness {
    constructor(private bookingDB: BookingRepository) {}
    findCheckin = jest.fn(async ({ id }: IdDTO): Promise<Checkin | null> => {
        return [] as any
    })
  
    findUserCheckin = jest.fn(async (input: FindUserCheckinsDTO): Promise<Checkin[]>  =>{
        return [] as any

    })
  
    findByEntity = jest.fn(async (input: FindCheckinDTO): Promise<Checkin[]>  =>{
        return [] as any

    })
  
    createCheckin = jest.fn(async (input: CreateCheckinDTO): Promise<void>  =>{
   
     
    })
  
    createSingleCheckin = jest.fn(async (input: CreateSingleDTO): Promise<void>  =>{
      
    })
  
    deleteCheckin = jest.fn(async ({ id, type }: DeleteDTO): Promise<void> => {
      
    })
  }
  