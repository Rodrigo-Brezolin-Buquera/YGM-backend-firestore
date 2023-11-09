import { IdDTO } from "../../../common/domain/common.id.dto";
import { EditMessageDTO } from "../domain/DTOs/messages.edit.dto";
import { Message } from "../domain/messages.Entity";
import { MessagesRepository } from "./messages.Repository";

export class MessagesBusiness {
  constructor(private messagesDB: MessagesRepository) {}

  public async find({id}: IdDTO): Promise<Message> {
    return await this.messagesDB.find(id);
  }

  public async edit(input: EditMessageDTO ): Promise<void> {
    const {id, message } = input;

    const messageDB = await this.messagesDB.find(id);

    messageDB.setContent(message)
  
    await this.messagesDB.edit(id, messageDB)
  }
}
