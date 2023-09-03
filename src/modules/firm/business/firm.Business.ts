import { NotFound } from "../../../common/customError/notFound";
import { EditFirmDTO } from "../domain/DTOs/firm.edit.dto";
import { Firm } from "../domain/firm.Entity";
import { FirmRepository } from "./firm.Repository";

export class FirmBusiness {
  constructor(private firmDB: FirmRepository) {}

  public async find(): Promise<Firm> {
    const firm = await this.firmDB.find();
    if (!firm) {
      throw new NotFound();
    }
    return firm;
  }

  public async edit(input: EditFirmDTO ): Promise<void> {
    const { address, email, facebook, instagram, phone, website, whatsapp } =
      input;

    const firm = await this.firmDB.find();
    if (!firm) {
      throw new NotFound();
    }

    address && firm.setAddress(address)
    email && firm.setEmail(email)
    facebook && firm.setFacebook(facebook)
    instagram && firm.setInstagram(instagram)
    phone && firm.setPhone(phone)
    website && firm.setWebsite(website)
    whatsapp && firm.setWhatsapp(whatsapp)

    await this.firmDB.edit(firm)
  }
}
