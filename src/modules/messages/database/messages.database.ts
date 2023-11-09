
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { MessagesRepository } from "../business/messages.Repository";
import { Message, MessageObject } from "../domain/messages.Entity";

export class MessagesDatabase extends BaseDatabase  implements MessagesRepository {
  collectionName = "messageBoard";

  public async find(id:string): Promise<Message> {
    const data = await super.findById(id);
    return Message.toModel(data as MessageObject)
  }

  public async edit(id: string, message:Message): Promise<void> {
    await this.collection().doc(id).update(this.toFirestoreMessage(message))
  }

  private toFirestoreMessage(obj: Message): object {
    return {
      content: obj.getContent(),
    };
  }
}
