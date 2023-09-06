import { FirmRepository } from "../../../../src/modules/firm/business/firm.Repository";
import { EditFirmDTO } from "../../../../src/modules/firm/domain/DTOs/firm.edit.dto";
import { Firm } from "../../../../src/modules/firm/domain/firm.Entity";
import {mockFirm} from "./firm.database.mock"

export class FirmBusinessMock {
    constructor(private firmDB: FirmRepository) {}

    public  find = jest.fn( async (): Promise<Firm>=> {
      return mockFirm
    })
  
    public  edit = jest.fn( async (input: EditFirmDTO ): Promise<void> =>{ })
}