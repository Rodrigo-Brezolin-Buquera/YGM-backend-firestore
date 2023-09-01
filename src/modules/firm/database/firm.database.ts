
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { FirmRepository } from "../business/firm.Repository";
import { Firm } from "../domain/firm.Entity";

export class FirmDatabase extends BaseDatabase  implements FirmRepository {
  collectionName = "firm";

  public async find(): Promise<Firm> {
    const data = await super.findById("main");
    return Firm.toModel(data)
  }

  public async edit(firm:Firm): Promise<void> {
     await super.edit(firm, this.toFirestoreFirm);
  }

  private toFirestoreFirm(obj: Firm): any {
    return {
      address: obj.getAddress(),
      email: obj.getEmail(),
      facebook: obj.getFacebook(),
      instagram: obj.getInstagram(),
      phone: obj.getPhone(),
      website: obj.getWebsite(),
      whatsapp: obj.getWhatsapp()
    };
}
}
