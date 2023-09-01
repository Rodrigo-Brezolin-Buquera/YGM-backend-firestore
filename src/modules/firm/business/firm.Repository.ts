import { Firm } from "../domain/firm.Entity";

export interface FirmRepository {
  find(): Promise<Firm>;
  edit(firm: Firm): Promise<void>;
}
