
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { FirmRepository } from "../business/firm.Repository";
import { Firm, FirmObject } from "../domain/firm.Entity";

export class FirmDatabase extends BaseDatabase  implements FirmRepository {
  collectionName = "firm";

  public async find(): Promise<Firm> {
    const data = await super.findById("main");
    return Firm.toModel(data as FirmObject)
  }

  public async edit(firm:Firm): Promise<void> {
    await this.collection().doc("main").update(this.toFirestoreFirm(firm))
  }

  private toFirestoreFirm(obj: Firm): object {
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
