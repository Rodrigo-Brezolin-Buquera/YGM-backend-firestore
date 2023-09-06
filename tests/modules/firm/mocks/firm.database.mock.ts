import { FirmRepository } from "../../../../src/modules/firm/business/firm.Repository";
import { Firm } from "../../../../src/modules/firm/domain/firm.Entity";

export const mockFirm = Firm.toModel ({
    address: "address",
    email: "email",
    facebook: "facebook",
    instagram: "instagram",
    phone: "phone",
    website: "website",
    whatsapp: "whatsapp"
})


export class FirmDatabaseMock implements FirmRepository {
    public find = jest.fn( async (): Promise<Firm>  =>{
        return mockFirm
    })
    public edit = jest.fn( async (firm: Firm): Promise<void> => {})
}